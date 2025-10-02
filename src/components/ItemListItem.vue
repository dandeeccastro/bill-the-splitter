<script setup lang='ts'>
import { ref } from 'vue';
import { useTableStore } from '@/stores/table';
import { formatMoney } from '@/services/currency';

const store = useTableStore();

interface Item {
  name: string,
  value: number,
  amount: number,
  people: { [key: string]: number },
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
  const newPeople = Object.keys(people.value).reduce((acc: {[key:string]: number}, curr: string) => {
    if (people.value[curr]) {
      acc[curr] = people.value[curr];
    }
    return acc
  }, {});

  people.value = newPeople;

  const item = {
    name: name.value,
    value: value.value,
    amount: amount.value,
    people: people.value
  }

  emit('editItem', props.item.name, item);
  editMode.value = false;
}

</script>
<template>
  <div class="list-row" v-if='!editMode'>
    <div class="list-col-grow">
      {{ amount }} {{ name }} ({{formatMoney(value)}})
    </div>
    <div class="list-col-wrap">
      <span v-for='person in Object.keys(people)' :key='person'  class="badge border-secondary mx-1">{{person}}</span>
    </div>
    <div>
      <v-icon class='mx-1' name='md-edit' @click='editMode = true'></v-icon>
      <v-icon class='mx-1' name='md-delete-outlined' @click='$emit("deleteItem", item.name)'></v-icon>
    </div>
  </div>
  <div class="list-row" v-else>
    <div class="list-col-grow">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nome</legend>
        <input type="text" v-model='name' class="input">
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Valor em centavos</legend>
        <input type="number" v-model='value' class="input">
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Quantidade pedida pela mesa</legend>
        <input type="number" v-model='amount' class="input">
      </fieldset>
      <fieldset class='fieldset' v-for='person of store.people' :key='person'>
        <legend class='fieldset-legend'>Quantidade pedida por {{person}}</legend>
        <input type="number" class='input' v-model='people[person]'>
      </fieldset>
      <fieldset class="fieldset">
        <button class='btn' @click='editItem'>
          <v-icon class="mx-1" name='bi-check-lg'></v-icon>
          Atualizar item
        </button>
      </fieldset>
    </div>
  </div>
</template>
<style scoped></style>
