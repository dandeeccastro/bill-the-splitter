import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdEdit, MdDeleteOutlined, BiCheckLg } from 'oh-vue-icons/icons';

addIcons(MdEdit, MdDeleteOutlined, BiCheckLg);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('v-icon', OhVueIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')
