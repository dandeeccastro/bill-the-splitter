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
const emit = defineEmits([
  'editOrder',
  'deleteOrder',
  'addOrder',
  'cancel'
]);

const props = defineProps<{
  order?: Order
  index?: number
  mode: number
}>()

const amount = ref(props.order ? props.order.amount : 0)
const people = ref(props.order ? props.order.people : [])
const item = ref(props.order ? props.order.item : '')

const mode = ref(props.mode)

function buildOrderFromRefs() {
  return {
    amount: amount.value,
    people: people.value,
    item: item.value,
  }
}

function editOrder() {
  const order = buildOrderFromRefs();
  emit('editOrder', props.index, order)
}

function addOrder() {
  const order = buildOrderFromRefs();
  emit('addOrder', order)
}
</script>

<template>
  <div class="list-row">
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <select v-model="item" name="item" class="select">
          <option disabled selected>{{ $t('editOrder.chooseItem') }}</option>
          <option v-for="item of store.items" :value="item.name" :key="item.toString()">
            {{ item.name }}
          </option>
        </select>
        <legend class="fieldset-legend">{{ $t('editOrder.item') }}</legend>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('editOrder.howMany') }}</legend>
        <input type="number" v-model="amount" class="input" />
      </fieldset>
      <fieldset class="fieldset flex flex-row">
        <legend class="fieldset-legend">{{ $t('editOrder.whoOrdered') }}</legend>
        <label class="label mx-1" v-for="person in store.people" :key="person">
          <input type="checkbox" class="checkbox" v-model="people" :value="person" />
          {{ person }}
        </label>
      </fieldset>
      <fieldset class="fieldset">
        <button class="btn" @click="mode === Mode.Create ? addOrder() : editOrder()">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          {{ $t('editOrder.updateOrder')}}
        </button>
        <button class="btn" @click="$emit('cancel')">
          <v-icon class="mx-1" name="io-close"></v-icon>
          {{ $t('editOrder.cancelOrder')}}
        </button>
      </fieldset>
    </div>
  </div>
</template>

