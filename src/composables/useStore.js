import { reactive, watch } from 'vue';

export const LS_KEY = 'order-app-store-v1';
const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');

export const store = reactive({
  menu: [],                                  // ← 不用 saved.menu
  cart: saved.cart || [],
  orders: saved.orders || [],
  ui: { activeTab: '全部', search: '' },
  settings: saved.settings || {
    taxRate: 0.0, // 稅金
    svcRate: 0.0, // 服務費
    currency: 'TWD',
    notify: { method: 'discord', discordWebhookUrl: '' }
  }
});

// 只存 cart / orders / settings
watch(
  () => ({ cart: store.cart, orders: store.orders, settings: store.settings }),
  (snap) => localStorage.setItem(LS_KEY, JSON.stringify(snap)),
  { deep: true }
);

export const currencySymbol = () =>
  store.settings.currency === 'TWD' ? '$' :
  (store.settings.currency === 'USD' ? 'US$' : '¥');