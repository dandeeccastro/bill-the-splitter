<script setup lang="ts">
import { ref } from 'vue'
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

const emit = defineEmits([
  'editItem',
  'deleteItem',
  'addItem',
  'cancel'
]);

const mode = ref(props.mode)

const name = ref(props.item ? props.item.name : '')
const value = ref(props.item ? props.item.value : 0)

function buildFoodFromRefs() {
  return {
    name: name.value,
    value: value.value,
  }
}

function editItem() {
  const item = buildFoodFromRefs();
  emit('editItem', props.index, item)
}

function addItem() {
  const item = buildFoodFromRefs();
  emit('addItem', item)
}

const maskedValue = ref(props.item ? props.item.value : 0)
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
  <div class="list-row">
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
