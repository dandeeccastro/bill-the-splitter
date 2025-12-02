import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdEdit, MdDeleteOutlined, BiCheckLg, IoClose } from 'oh-vue-icons/icons';

addIcons(MdEdit, MdDeleteOutlined, BiCheckLg, IoClose);

import App from './App.vue'
import router from './router'
import './registerServiceWorker'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        notation: 'standard',
      }
    },
    pt: {
      currency: {
        style: 'currency',
        currency: 'BRL',
        notation: 'standard',
      }
    },
  },
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
      },
      editOrder: {
        chooseItem: 'Pick an item',
        cancelOrder: 'Cancel',
        item: 'Item',
        howMany: 'How many?',
        whoOrdered: "Who's ordering that?",
        updateOrder: 'Update order',
      },
      editItem: {
        name: 'Name',
        valueComma: 'Value (with comma)',
        addItem: 'Add item',
        updateItem: 'Update item',
        cancel: 'Cancel'
      }
    },
    pt: {
      total: 'Total',
      perPerson: 'Por pessoa',
      noOrders: 'Ainda não há pedidos adicionados na sua mesa!',
      leftoverCents: 'Centavos sobrando: {cents}',
      modal: {
        editTable: 'Editar mesa',
        orders: 'Pedidos',
        items: 'Itens',
        people: 'Pessoas',
        other: 'Outros',
        addOrder: 'Adicionar pedido',
        addItem: 'Adicionar item',
        addPerson: 'Adicionar pessoa',
        serviceTax: 'Taxa de serviço: {tax}',
        close: 'Fechar',
      },
      editOrder: {
        chooseItem: 'Escolha um item',
        item: 'Item',
        cancelOrder: 'Cancelar',
        howMany: 'Quantos?',
        whoOrdered: "Quem está pedindo?",
        updateOrder: 'Atualizar pedido',
      },
      editItem: {
        name: 'Nome',
        valueComma: 'Valor (com vírgula)',
        addItem: 'Adicionar item',
        updateItem: 'Atualizar item',
        cancel: 'Cancelar'
      }
    }
  }
});

const app = createApp(App)

app.component('v-icon', OhVueIcon);

app.use(createPinia())
app.use(router)
app.use(i18n)

router.isReady().then(() => app.mount('#app'))
