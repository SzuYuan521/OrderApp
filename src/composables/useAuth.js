/* 目前只有簡易的輸入密碼來驗證是不是使用者 */

import { ref } from 'vue';

// 這是密碼的 SHA-256 雜湊值（小寫 hex 字串）。
const PASSWORD_HASH_HEX = '0a5bff6d9cc8a3ebe1b121c8deffc86ea8fd7e3bf4a372464b02259d08815267' ; 

const authed = ref(false);

function toHex(buf){
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

export async function loginWithPassword(pw){
  const enc = new TextEncoder().encode(pw);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  const hex = toHex(digest);
  if(hex === PASSWORD_HASH_HEX){
    localStorage.setItem('soft_gate_ok', '1');
    authed.value = true;
    return true;
  }
  return false;
}

export function isAuthed(){
  if(authed.value) return true;
  const ok = localStorage.getItem('soft_gate_ok') === '1';
  authed.value = ok;
  return ok;
}