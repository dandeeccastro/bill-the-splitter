import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdEdit, MdDeleteOutlined, BiCheckLg } from 'oh-vue-icons/icons';

addIcons(MdEdit, MdDeleteOutlined, BiCheckLg);

import App from './App.vue'
import router from './router'
import './registerServiceWorker'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      total: 'Total',
      perPerson: 'Per person',
      noOrders: 'There are no orders added to your table!',
      leftoverCents: 'Leftover cents: {cents}',
      modal: {
        editTable: 'Edit Table',
        orders: 'Orders',
        items: 'Items',
        people: 'People',
        other: 'Other',
        addOrder: 'Add order',
        addItem: 'Add item',
        addPerson: 'Add person',
        serviceTax: 'Service tax: {tax}',
        close: 'Close',
      }
    },
    pt: {
      total: 'Total',
      perPerson: 'Por pessoa',
      noOrders: 'Ainda não há pedidos adicionados na sua mesa!',
      leftoverCents: 'Centavos sobrando: {cents}',
      modal: {
        editTable: 'Edit Table',
        orders: 'Orders',
        items: 'Items',
        people: 'People',
        other: 'Other',
        addOrder: 'Add order',
        addItem: 'Add item',
        addPerson: 'Add person',
        serviceTax: 'Service tax: {tax}',
        close: 'Fechar',
      }
    }
  }
});

const app = createApp(App)

app.component('v-icon', OhVueIcon);

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
