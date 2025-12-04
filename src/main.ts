import { createApp } from 'vue'
import { createI18n, type I18nOptions } from 'vue-i18n';
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdEdit, MdDeleteOutlined, BiCheckLg, IoClose } from 'oh-vue-icons/icons';

addIcons(MdEdit, MdDeleteOutlined, BiCheckLg, IoClose);

import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import i18NConfig from './data/i18n/index';

const i18n = createI18n(i18NConfig as I18nOptions);

const app = createApp(App)

app.component('v-icon', OhVueIcon);

app.use(createPinia())
app.use(router)
app.use(i18n)

router.isReady().then(() => app.mount('#app'))
