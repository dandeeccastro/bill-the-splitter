<script setup lang="ts">
import { ref, nextTick } from 'vue'

enum Mode {
  View,
  Edit,
  Create,
}

const props = defineProps<{
  person?: string
  index?: number
  mode: number
}>()

const mode = ref(props.mode)
const editablePerson = ref(props.person || '')

const emit = defineEmits(['editPerson', 'deletePerson', 'addPerson', 'cancel'])

function editPerson() {
  emit('editPerson', props.index, editablePerson.value)
}

function createPerson() {
  emit('addPerson', editablePerson.value)
}

async function toggleEdit() {
  await nextTick()
  document.getElementById(editablePerson.value)!.focus()
}

toggleEdit();
</script>

<template>
  <div class="list-row">
    <input
      :id="editablePerson"
      type="text"
      v-model="editablePerson"
      class="input list-col-grow" />

    <button
      class="btn"
      @click="mode === Mode.Create ? createPerson() : editPerson()"
    >
      <v-icon class="mx-1 h-full" name="bi-check-lg"></v-icon>
    </button>
    <button
      class='btn'
      @click='$emit("cancel")'
    >
      <v-icon class="mx-1 h-full" name="io-close"></v-icon>
    </button>
  </div>
</template>

<style scoped></style>

