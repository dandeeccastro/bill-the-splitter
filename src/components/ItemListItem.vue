<script setup lang="ts">
import { ref } from 'vue'
import { formatMoney } from '@/services/currency'
import { vMaska } from 'maska/vue'

interface Item {
  name: string
  value: number
}

const props = defineProps<{
  item: Item
}>()

const emit = defineEmits(['editItem', 'deleteItem'])

const editMode = ref(false)

const name = ref(props.item.name)
const value = ref(props.item.value)
const maskedValue = ref(props.item.value)

function editItem() {
  const item = {
    name: name.value,
    value: value.value,
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
    <div class="list-col-grow flex items-center">{{ name }} ({{ formatMoney(value) }})</div>
    <button class="btn" @click="editMode = true">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn" @click="$emit('deleteItem', item.name)">
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
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
        <button class="btn" @click="editItem">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          Atualizar item
        </button>
      </fieldset>
    </div>
  </div>
</template>
<style scoped></style>
