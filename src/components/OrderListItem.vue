<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import { ref } from 'vue'

interface Order {
  amount: number
  people: string[]
  item: string
}

enum Mode {
  View,
  Edit,
  Create,
}

const store = useTableStore()
const emit = defineEmits(['editOrder', 'deleteOrder', 'addOrder'])

const props = defineProps<{
  order?: Order
  index?: number
  mode: number
}>()

const amount = ref(props.order ? props.order.amount : 0)
const people = ref(props.order ? props.order.people : [])
const item = ref(props.order ? props.order.item : '')

const mode = ref(props.mode)

function editOrder() {
  const order = {
    amount: amount.value,
    people: people.value,
    item: item.value,
  }

  emit('editOrder', props.index, order)
  mode.value = Mode.View
}

function addOrder() {
  const order = {
    amount: amount.value,
    people: people.value,
    item: item.value,
  }

  emit('addOrder', order)
  mode.value = Mode.View
}
</script>

<template>
  <div class="list-row" v-if="mode === Mode.View">
    <div>{{ amount }}</div>
    <div>{{ item }}</div>
    <div class="list-col-grow">
      <div class='badge badge-primary badge-outline' v-for='person in people'>
        {{ person }}
      </div>
    </div>
    <button class="btn" @click="mode = Mode.Edit">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn" @click="$emit('deleteOrder', props.index)">
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <select v-model="item" name="item" class="select">
          <option disabled selected>Escolha um item</option>
          <option v-for="item of store.items" :value="item.name" :key="item.toString()">
            {{ item.name }}
          </option>
        </select>
        <legend class="fieldset-legend">Item</legend>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Quantos?</legend>
        <input type="number" v-model="amount" class="input" />
      </fieldset>
      <fieldset class="fieldset flex flex-row">
        <legend class="fieldset-legend">Pedido por</legend>
        <label class="label mx-1" v-for="person in store.people" :key="person">
          <input type="checkbox" class="checkbox" v-model="people" :value="person" />
          {{ person }}
        </label>
      </fieldset>
      <fieldset class="fieldset">
        <button class="btn" @click="mode === Mode.Create ? addOrder() : editOrder()">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          Atualizar pedido
        </button>
      </fieldset>
    </div>
  </div>
</template>
