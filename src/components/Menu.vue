<template>
<div class="card p16">
<div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap">
<input v-model="store.ui.search" placeholder="搜尋餐點或關鍵字 (按 Enter)" style="width:100%" @keyup.enter="noop" />
</div>
<div class="tabs">
<button
v-for="c in cats"
:key="c"
class="tab" :class="{active: c===store.ui.activeTab}"
@click="store.ui.activeTab=c"
>{{ c }}</button>
</div>
<div class="menu">
<div class="menu-item" v-for="m in filtered" :key="m.id">
<div>
<div style="font-weight:700">{{ m.name }}</div>
<div class="muted" style="font-size:12px">{{ m.cat }}<span v-if="m.desc">・{{ m.desc }}</span></div>
</div>
<div class="row">
<div class="price">{{ currencySymbol() }} {{ m.price.toLocaleString() }}</div>
<button class="btn btn-sm" @click="add(m)">加入</button>
</div>
</div>
</div>
</div>
</template>


<script setup>
import { computed } from 'vue';
import { store, currencySymbol } from '../composables/useStore';


const cats = computed(()=> ['全部', ...Array.from(new Set(store.menu.map(x=>x.cat)))]);
const filtered = computed(()=> {
const q = (store.ui.search || '').toLowerCase();
return store.menu.filter(m =>
(store.ui.activeTab==='全部' || m.cat===store.ui.activeTab) &&
(!q || m.name.toLowerCase().includes(q) || (m.desc||'').toLowerCase().includes(q))
);
});


function add(m){
const exist = store.cart.find(x=>x.id===m.id);
if(exist) exist.qty++;
else store.cart.push({id:m.id, name:m.name, price:m.price, qty:1});
}
function noop(){ /* 讓 Enter 觸發重新篩選即可 */ }
</script>