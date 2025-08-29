<script setup>
import Menu from './components/Menu.vue';
import Cart from './components/Cart.vue';
import Orders from './components/Orders.vue';
import NotifySettings from './components/NotifySettings.vue';
import LoginGate from './components/LoginGate.vue';
import { isAuthed } from './composables/useAuth';
import { store } from './composables/useStore';
import { sendDiscordNotification } from './composables/useNotify';
import { onMounted, computed } from 'vue';
import { loadStaticMenu } from './composables/useStaticMenu';

const authed = computed(()=> isAuthed());
const isAdmin = computed(() => location.search.includes('admin=1'));
function uid(){ return Math.random().toString(36).slice(2,10); }

// 進站時從 public/menu.json 載入（若本機尚未自訂）
onMounted(() => { loadStaticMenu(); });

function onCheckout(){
  if(!store.cart.length){
  alert('購物車是空的');
  return;
}
const sub = store.cart.reduce((s,i)=>s+i.price*i.qty,0);
const tax = Math.round(sub * (store.settings.taxRate || 0));
const svc = Math.round(sub * (store.settings.svcRate || 0));
const total = Math.max(0, sub + tax + svc);
const order = { id: uid(), ts: Date.now(), items: JSON.parse(JSON.stringify(store.cart)), total, status:'已下單' };
store.orders.push(order);
store.cart = [];


if(store.settings.notify?.method === 'discord'){
sendDiscordNotification(order).finally(()=>{
  alert('下單完成！');
  });
  } else {
  alert('下單完成！');
  }
}
</script>

<template>
  <LoginGate v-if="!authed" />
  <div v-else class="wrap">
  <h1>🍱 點餐網站 <span class="tag">阿星專屬</span></h1>
  <div class="grid">
    <Menu />
    <Cart @checkout="onCheckout" />
  </div>
  <div class="space"></div>
  <Orders :admin="isAdmin" />
  <div class="space"></div>
  <NotifySettings v-if="isAdmin"/>
  </div>
</template>