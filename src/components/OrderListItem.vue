<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import { ref } from 'vue'

interface Order {
  amount: number
  people: string[]
  item: string
}

const store = useTableStore()

const props = defineProps<{
  order: Order
}>()

const amount = ref(props.order.amount)
const people = ref(props.order.people)
const item = ref(props.order.item)

const editMode = ref(false)
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
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Item</legend>
        <input v-model="item" class="input" list="items" />
        <datalist id="items">
          <option v-for="item of store.items" :value="item.name" :key="item.toString()"></option>
        </datalist>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Quantos?</legend>
        <input type="number" v-model="amount" class="input" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Pedido por</legend>
        <input type="text" v-model="item" class="input" list="people" />
        <datalist id="people">
          <option v-for="person of store.people" :value="person" :key="person">{{ person }}</option>
        </datalist>
      </fieldset>
    </div>
  </div>
</template>
