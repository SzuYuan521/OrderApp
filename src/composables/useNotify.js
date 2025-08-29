import { store } from './useStore';


export async function sendDiscordNotification(order){
const url = store.settings?.notify?.discordWebhookUrl;
if(!url){
console.warn('Discord Webhook URL 尚未設定');
return;
}
const title = `🧾 新訂單 #${String(order.id).slice(-6).toUpperCase()}`;
const lines = order.items.map(i=>`• ${i.name} x${i.qty}（$${i.price*i.qty}）`).join('\n');


try{
await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
content: `${title}\n${new Date(order.ts).toLocaleString()}\n\n${lines}\n——\n合計：$${order.total}`,
embeds: [
{
title,
description: lines,
timestamp: new Date(order.ts).toISOString(),
footer: { text: `總額 $${order.total}` }
}
]
})
});
}catch(err){
console.warn('Discord 通知失敗', err);
}
}