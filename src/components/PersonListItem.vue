<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps<{
  person?: string
}>()

const editablePerson = ref(props.person);
const editMode = ref(false);

const emit = defineEmits(['editPerson', 'deletePerson']);

function editPerson() {
  emit('editPerson', props.person, editablePerson.value);
  editMode.value = false;
}
</script>

<template>
  <div class="list-row" v-if='!editMode'>
    <div class='list-col-grow'>{{editablePerson}}</div>
    <div>
      <v-icon class='mx-1' name='md-edit' @click='editMode = true'></v-icon>
      <v-icon class='mx-1' name='md-delete-outlined' @click="$emit('deletePerson', props.person)"></v-icon>
    </div>
  </div>
  <div class="list-row" v-else>
    <input type="text" v-model='editablePerson' :placeholder='props.person' class="input">
    <v-icon class='mx-1 h-full' name='bi-check-lg' @click='editPerson'></v-icon>
  </div>
</template>

<style scoped></style>

