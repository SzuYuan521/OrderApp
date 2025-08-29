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


const webhook = ref(store.settings?.notify?.discordWebhookUrl || '');


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