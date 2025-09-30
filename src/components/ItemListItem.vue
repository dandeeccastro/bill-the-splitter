<script setup lang='ts'>
import { defineProps } from 'vue';

interface Item {
  name: string,
  value: number,
  amount: number,
  people: Array<string>,
}

defineProps<{
  item: Item,
}>();

function formatMoney(value: number) {
  return `R$ ${value/100}`
}
</script>
<template>
  <div class="list-row">
    <div class="list-col-grow">
      {{ item.amount }} {{ item.name }} ({{formatMoney(item.value)}})
    </div>
    <div class="list-col-wrap">
      <span v-for='person in item.people' :key='person'  class="badge border-secondary mx-1">{{person}}</span>
    </div>
    <div>
      <v-icon class='mx-1' name='md-edit'></v-icon>
      <v-icon class='mx-1' name='md-delete-outlined' @click='$emit("deleteItem", item.name)'></v-icon>
    </div>
  </div>
</template>
<style scoped></style>
