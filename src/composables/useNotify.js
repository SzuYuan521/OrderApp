// src/composables/useNotify.js
import { store } from './useStore';

// 🔒 寫死的預設 Webhook（localStorage 沒設就用這個）
const DEFAULT_WEBHOOK = 'https://discord.com/api/webhooks/1410701038159396884/YP7VEFfjvq6ZIl4HZPZ6-gRYiExx_ZI7zxAkaPg-EU347MyqI2ySLn4wP8KTg9kFHNM6';

export async function sendDiscordNotification(order){
  // 只有在設定為 discord 時才發送（不綁 admin）
  if (store.settings?.notify?.method !== 'discord') return false;

  // 優先用設定的 URL，沒有就用寫死的預設
  const url = store.settings?.notify?.discordWebhookUrl || DEFAULT_WEBHOOK;
  if (!url) {
    console.warn('Discord Webhook URL 未設定');
    return false;
  }

  const title = `🧾 新訂單 #${String(order.id).slice(-6).toUpperCase()}`;
  const lines = (order.items || [])
    .map(i => `• ${i.name} x${i.qty}（$${(i.price * i.qty).toLocaleString()}）`)
    .join('\n');
  const ts = new Date(order.ts || Date.now());

  const payload = {
    content: `${title}\n${ts.toLocaleString()}\n\n${lines}\n——\n合計：$${(order.total||0).toLocaleString()}`,
    embeds: [
      {
        title,
        description: lines,
        timestamp: ts.toISOString(),
        footer: { text: `總額 $${(order.total||0).toLocaleString()}` }
      }
    ]
  };

  try{
    const res = await fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok){
      console.warn('Discord 通知失敗：HTTP', res.status);
      return false;
    }
    return true;
  }catch(err){
    console.warn('Discord 通知例外：', err?.message || err);
    return false;
  }
}