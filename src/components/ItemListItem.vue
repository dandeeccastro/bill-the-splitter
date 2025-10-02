<script setup lang="ts">
import { ref } from 'vue'
import { useTableStore } from '@/stores/table'
import { formatMoney } from '@/services/currency'
import { vMaska } from 'maska/vue'

const store = useTableStore()

interface Item {
  name: string
  value: number
  amount: number
  people: { [key: string]: number }
}

const props = defineProps<{
  item: Item
}>()

const emit = defineEmits(['editItem', 'deleteItem'])

const editMode = ref(false)

const name = ref(props.item.name)
const amount = ref(props.item.amount)
const value = ref(props.item.value)
const maskedValue = ref(props.item.value)
const people = ref(props.item.people)

function editItem() {
  const newPeople = Object.keys(people.value).reduce(
    (acc: { [key: string]: number }, curr: string) => {
      if (people.value[curr]) {
        acc[curr] = people.value[curr]
      }
      return acc
    },
    {},
  )

  people.value = newPeople

  const item = {
    name: name.value,
    value: value.value,
    amount: amount.value,
    people: people.value,
  }

  emit('editItem', props.item.name, item)
  editMode.value = false
}

const maskOptions = {
  mask: '0 00#,##',
  reversed: true,
  tokens: {
    0: { pattern: /[0-9]/, repeated: true },
  },
}

defineExpose({ value })
</script>
<template>
  <div class="list-row" v-if="!editMode">
    <div class="list-col-grow flex items-center">
      {{ amount }} {{ name }} ({{ formatMoney(value) }})
    </div>
    <div class="list-col-wrap" v-if="Object.keys(people).length > 0">
      <span
        v-for="person in Object.keys(people)"
        :key="person"
        class="badge border-secondary mx-1"
        >{{ person }}</span
      >
    </div>
    <button class="btn">
      <v-icon class="mx-1" name="md-edit" @click="editMode = true"></v-icon>
    </button>
    <button class="btn">
      <v-icon
        class="mx-1"
        name="md-delete-outlined"
        @click="$emit('deleteItem', item.name)"
      ></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nome</legend>
        <input type="text" v-model="name" class="input" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Valor (com vírgula)</legend>
        <input v-maska:value.unmasked="maskOptions" v-model="maskedValue" class="input" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Quantidade pedida pela mesa</legend>
        <input type="number" v-model="amount" class="input" />
      </fieldset>
      <fieldset class="fieldset" v-for="person of store.people" :key="person">
        <legend class="fieldset-legend">Quantidade pedida por {{ person }}</legend>
        <input type="number" class="input" v-model="people[person]" />
      </fieldset>
      <fieldset class="fieldset">
        <button class="btn" @click="editItem">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          Atualizar item
        </button>
      </fieldset>
    </div>
  </div>
</template>
<style scoped></style>
