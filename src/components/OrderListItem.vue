<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import { ref } from 'vue'

interface Order {
  amount: number
  people: string[]
  item: string
}

const store = useTableStore()
const emit = defineEmits(['editOrder', 'deleteOrder'])

const props = defineProps<{
  order: Order
  index: number
}>()

const amount = ref(props.order.amount)
const people = ref(props.order.people)
const item = ref(props.order.item)

const editMode = ref(false)

function editOrder() {
  const order = {
    amount: amount.value,
    people: people.value,
    item: item.value,
  }

  emit('editOrder', props.index, order)
  editMode.value = false
}
</script>

<template>
  <div class="list-row" v-if="!editMode">
    <div>{{ amount }}</div>
    <div>{{ item }}</div>
    <div class="list-col-grow">{{ people }}</div>
    <button class="btn" @click="editMode = true">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn">
      <v-icon
        class="mx-1"
        name="md-delete-outlined"
        @click="$emit('deleteOrder', props.index)"
      ></v-icon>
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
        <button class="btn" @click="editOrder">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          Atualizar pedido
        </button>
      </fieldset>
    </div>
  </div>
</template>
