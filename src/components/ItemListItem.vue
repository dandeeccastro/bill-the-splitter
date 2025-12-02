<script setup lang="ts">
import { ref } from 'vue'
import { formatMoney } from '@/services/currency'
import { vMaska } from 'maska/vue'

interface Item {
  name: string
  value: number
}

enum Mode {
  View,
  Edit,
  Create,
}

const props = defineProps<{
  item?: Item
  index?: number
  mode: number
}>()

const emit = defineEmits(['editItem', 'deleteItem', 'addItem', 'cancel'])

const mode = ref(props.mode)

const name = ref(props.item ? props.item.name : '')
const value = ref(props.item ? props.item.value : 0)
const maskedValue = ref(props.item ? props.item.value : 0)

function editItem() {
  const item = {
    name: name.value,
    value: value.value,
  }

  emit('editItem', props.index, item)
  mode.value = Mode.View
}

function addItem() {
  const item = {
    name: name.value,
    value: value.value,
  }

  emit('addItem', item)
  mode.value = Mode.View
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
  <div class="list-row" v-if="mode === Mode.View">
    <div class="list-col-grow flex items-center">{{ name }} ({{ $n(value/100, 'currency') }})</div>
    <button class="btn" @click="mode = Mode.Edit">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn" @click="$emit('deleteItem', props.index)">
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('editItem.name') }}</legend>
        <input type="text" v-model="name" class="input" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('editItem.valueComma') }}</legend>
        <input v-maska:value.unmasked="maskOptions" v-model="maskedValue" class="input" />
      </fieldset>
      <fieldset class="fieldset">
        <button class="btn" @click="mode === Mode.Create ? addItem() : editItem()">
          <v-icon class="mx-1" name="bi-check-lg"></v-icon>
          {{ mode === Mode.Create ? $t('editItem.addItem') : $t('editItem.updateItem') }}
        </button>
        <button class='btn' @click='$emit("cancel")'>
          <v-icon class="mx-1" name="io-close"></v-icon>
          {{ $t('editItem.cancel')}}
        </button>
      </fieldset>
    </div>
  </div>
</template>
<style scoped></style>
