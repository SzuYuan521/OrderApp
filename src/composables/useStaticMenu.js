// src/composables/useStaticMenu.js
import { store } from './useStore';

// 用版本或時間戳破快取（部署更新時改字串就能強制刷新）
const MENU_BUSTER = 'v1';

export async function loadStaticMenu() {
  try {
    const res = await fetch(`./menu.json?${MENU_BUSTER}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(res.statusText);
    const arr = await res.json();
    if (!Array.isArray(arr)) throw new Error('menu.json 格式需為陣列');
    store.menu = arr.map(x => ({
      id: x.id || Math.random().toString(36).slice(2,10),
      name: String(x.name || ''),
      price: Number(x.price) || 0,
      cat: x.cat || '其他',
      desc: x.desc || ''
    }));
  } catch (e) {
    console.warn('載入 menu.json 失敗：', e);
    if (!store.menu.length) {
      // 保底：避免整頁空白
      store.menu = [
        {id:'fallback-1', name:'示範品項', price:0, cat:'其他', desc:'menu.json 載入失敗時的保底'}
      ];
    }
  }
}