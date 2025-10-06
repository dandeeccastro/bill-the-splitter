<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  person: string
}>()

const editablePerson = ref(props.person)
const editMode = ref(false)

const emit = defineEmits(['editPerson', 'deletePerson'])

function editPerson() {
  emit('editPerson', props.person, editablePerson.value)
  editMode.value = false
}

async function toggleEdit() {
  editMode.value = true
  await nextTick()
  document.getElementById(editablePerson.value)!.focus()
}
</script>

<template>
  <div class="list-row" v-if="!editMode">
    <div class="list-col-grow flex items-center">{{ editablePerson }}</div>
    <button class="btn" @click="toggleEdit">
      <v-icon class="mx-1" name="md-edit"></v-icon>
    </button>
    <button class="btn" @click="$emit('deletePerson', props.person)">
      <v-icon class="mx-1" name="md-delete-outlined"></v-icon>
    </button>
  </div>
  <div class="list-row" v-else>
    <input
      :id="editablePerson"
      type="text"
      v-model="editablePerson"
      :placeholder="props.person"
      class="input list-col-grow"
    />
    <button class="btn" @click="editPerson">
      <v-icon class="mx-1 h-full" name="bi-check-lg"></v-icon>
    </button>
  </div>
</template>

<style scoped></style>
