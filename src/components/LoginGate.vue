<template>
  <div class="wrap">
    <div class="card p16" style="max-width:420px;margin:80px auto">
      <h2>🔒 輸入紀念日</h2>
      <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap">
        <input v-model="pw" type="password" placeholder="Password" style="width:100%" @keyup.enter="doLogin"/>
        <button class="btn" style="width:100%" @click="doLogin">登入</button>
      </div>
      <p class="muted" v-if="err" style="margin-top:8px">密碼不正確</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { loginWithPassword } from '../composables/useAuth';

const pw = ref('');
const err = ref(false);

async function doLogin(){
  err.value = false;
  const ok = await loginWithPassword(pw.value);
  if(!ok) err.value = true;
}
</script>
