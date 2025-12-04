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
  mode.value = Mode.View
}

function createPerson() {
  emit('addPerson', editablePerson.value)
  mode.value = Mode.View
}

async function toggleEdit() {
  mode.value = Mode.Edit
  await nextTick()
  document.getElementById(editablePerson.value)!.focus()
}
</script>

<template>
  <div class="list-row" v-if="mode === Mode.View">
    <div class="list-col-grow flex items-center">{{ editablePerson }}</div>
    <button class="btn" @click="toggleEdit">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn" @click="$emit('deletePerson', props.index)">
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <input :id="editablePerson" type="text" v-model="editablePerson" class="input list-col-grow" />
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
