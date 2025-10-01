<script setup lang='ts'>
import { ref, defineProps, defineEmits } from 'vue';
import { useTableStore } from '@/stores/table';
import { formatMoney } from '@/services/currency';

const store = useTableStore();

interface Item {
  name: string,
  value: number,
  amount: number,
  people: Array<string>,
}

const props = defineProps<{
  item: Item,
}>();

const emit = defineEmits(['editItem', 'deleteItem']);

const editMode = ref(false);

const name = ref(props.item.name);
const amount = ref(props.item.amount);
const value = ref(props.item.value);
const people = ref(props.item.people);

function editItem() {
  emit('editItem', props.item.name, name.value, value.value, amount.value, people.value);
  editMode.value = false;
}

</script>
<template>
  <div class="list-row" v-if='!editMode'>
    <div class="list-col-grow">
      {{ amount }} {{ name }} ({{formatMoney(value)}})
    </div>
    <div class="list-col-wrap">
      <span v-for='person in people' :key='person'  class="badge border-secondary mx-1">{{person}}</span>
    </div>
    <div>
      <v-icon class='mx-1' name='md-edit' @click='editMode = true'></v-icon>
      <v-icon class='mx-1' name='md-delete-outlined' @click='$emit("deleteItem", item.name)'></v-icon>
    </div>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <input type="text" v-model='name' class="input">
      <input type="number" v-model='value' class="input">
      <input type="number" v-model='amount' class="input">
      <div v-for='person of store.people' :key='person'>
        <input type="checkbox" class='checkbox' :id='person' :value='person' v-model='people'>
        <label :for="person">{{person}}</label>
      </div>
    </div>
    <div>
      <v-icon class="mx-1" name='bi-check-lg' @click='editItem'></v-icon>
    </div>
  </div>
</template>
<style scoped></style>
