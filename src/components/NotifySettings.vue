<template>
<div class="card p16">
<h2>🔔 通知設定</h2>
<div class="row" style="gap:8px;flex-wrap:wrap">
<select v-model="store.settings.notify.method">
<option value="none">關閉</option>
<option value="discord">Discord Webhook</option>
</select>
<input v-model="webhook" placeholder="Discord Webhook URL" style="min-width:320px" />
<button class="btn btn-sm" @click="save">存檔</button>
<button class="btn-ghost btn-sm" @click="test">發送測試</button>
</div>
</div>
</template>


<script setup>
import { ref } from 'vue';
import { store } from '../composables/useStore';
import { sendDiscordNotification } from '../composables/useNotify';

// 寫死的預設 Webhook
const DEFAULT_WEBHOOK = "https://discord.com/api/webhooks/1410701038159396884/YP7VEFfjvq6ZIl4HZPZ6-gRYiExx_ZI7zxAkaPg-EU347MyqI2ySLn4wP8KTg9kFHNM6";

// 初始化 webhook: 先讀 localStorage 的 store，如果沒有就用預設
const webhook = ref(
  store.settings?.notify?.discordWebhookUrl || DEFAULT_WEBHOOK
);

// 同步回 store(避免每次刷新又是空的)
watch(webhook, (val) => {
  store.settings.notify = { ...store.settings.notify, discordWebhookUrl: val };
}, { immediate: true });

function save(){
store.settings.notify = { ...store.settings.notify, discordWebhookUrl: webhook.value };
alert('已儲存 Discord Webhook URL');
}


function test(){
const demo = {
id: 'test1234',
ts: Date.now(),
items: [ {name:'測試商品', qty:1, price:123} ],
total: 123,
status: '已下單'
};
sendDiscordNotification(demo);
}
</script>