<template>
<div class="card p16">
<h2>🧾 訂單紀錄</h2>
<div v-if="!store.orders.length" class="muted">尚無訂單</div>
<div v-else class="cart-list">
<div class="cart-item" v-for="o in reversed" :key="o.id">
<div>
<div style="font-weight:700">訂單 #{{ String(o.id).slice(-6).toUpperCase() }} ・ {{ new Date(o.ts).toLocaleString() }}</div>
<div class="muted" style="font-size:12px">{{ o.items.map(i=>`${i.name}x${i.qty}`).join('，') }}</div>
</div>
<div class="row">
<span class="pill">{{ o.status }}</span>
<div style="width:100px;text-align:right;font-weight:700">{{ currencySymbol() }} {{ o.total.toLocaleString() }}</div>
<div v-if="admin">
    <select v-model="o.status">
        <option>已下單</option>
        <option>已完成</option>
        <option>已取消</option>
    </select>
</div>
</div>
</div>
</div>
</div>
</template>


<script setup>
import { computed } from 'vue';
import { store, currencySymbol } from '../composables/useStore';

const { admin } = defineProps({
  admin: { type: Boolean, default: false }
});

const reversed = computed(()=> store.orders.slice().reverse());
</script>