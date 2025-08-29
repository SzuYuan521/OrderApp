<template>
<div class="card p16 right-sticky">
<h2>🛒 購物車</h2>
<div class="cart-list" v-if="!store.cart.length"><div class="muted">購物車是空的</div></div>
<div class="cart-list" v-else>
<div class="cart-item" v-for="i in store.cart" :key="i.id">
<div>
<div style="font-weight:700">{{ i.name }}</div>
<div class="muted" style="font-size:12px">單價：{{ currencySymbol() }} {{ i.price.toLocaleString() }}</div>
</div>
<div class="qty">
<!-- 減一 -->
<button class="btn-ghost btn-sm" @click="dec(i)" aria-label="減一">
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M5 11h14v2H5z"/>
  </svg>
</button>
<div style="min-width:24px;text-align:center">{{ i.qty }}</div>
<!-- 加一 -->
<button class="btn-ghost btn-sm" @click="inc(i)" aria-label="加一">
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M11 5h2v14h-2zM5 11h14v2H5z"/>
  </svg>
</button>
<div style="width:80px;text-align:right;font-weight:700">{{ currencySymbol() }} {{ (i.price*i.qty).toLocaleString() }}</div>
<button class="btn-danger btn-sm" @click="delItem(i)" aria-label="刪除">
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M9 3v1H4v2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9Zm-2 3h10v12H7V6Zm2 2v8h2V8H9Zm4 0v8h2V8h-2Z"/>
  </svg>
</button>
</div>
</div>
</div>


<div class="totals">
<div class="row" style="justify-content:space-between"><span>小計</span><b>{{ currencySymbol() }} {{ sub }}</b></div>
<div class="row" style="justify-content:space-between"><span>稅金 <span class="muted">({{ (store.settings.taxRate*100).toFixed(0) }}%)</span></span><b>{{ currencySymbol() }} {{ tax }}</b></div>
<div class="row" style="justify-content:space-between"><span>服務費 <span class="muted">({{ (store.settings.svcRate*100).toFixed(0) }}%)</span></span><b>{{ currencySymbol() }} {{ svc }}</b></div>
<div class="row" style="justify-content:space-between;font-size:18px"><span>合計</span><b>{{ currencySymbol() }} {{ total }}</b></div>
<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px">
<button class="btn" @click="$emit('checkout')">✅ 下單</button>
<button class="btn-ghost" @click="store.cart = []">清空</button>
</div>
</div>
</div>
</template>


<script setup>
import { computed } from 'vue';
import { store, currencySymbol } from '../composables/useStore';


const sub = computed(()=> store.cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString());
const tax = computed(()=> Math.round(store.cart.reduce((s,i)=>s+i.price*i.qty,0)*(store.settings.taxRate||0)).toLocaleString());
const svc = computed(()=> Math.round(store.cart.reduce((s,i)=>s+i.price*i.qty,0)*(store.settings.svcRate||0)).toLocaleString());
const total = computed(()=> {
const subNum = store.cart.reduce((s,i)=>s+i.price*i.qty,0);
const taxNum = Math.round(subNum*(store.settings.taxRate||0));
const svcNum = Math.round(subNum*(store.settings.svcRate||0));
return (subNum+taxNum+svcNum).toLocaleString();
});


function dec(i){ i.qty--; if(i.qty<=0) store.cart = store.cart.filter(x=>x.id!==i.id); }
function inc(i){ i.qty++; }
function delItem(i){ store.cart = store.cart.filter(x=>x.id!==i.id); }
</script>