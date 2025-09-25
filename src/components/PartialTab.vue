<script setup lang="ts">
import { useTableStore } from '@/stores/table';

const store = useTableStore();

function formatMoney(value: number) {
  return `R$ ${value/100}`
}
</script>

<template>
  <div v-for='person of store.people' :key='person' class='overflow-x-auto py-4'>
    <h2 class="text-xl w-full font-semibold px-2">{{person}}</h2>
    <div class='table table-sm px-4'>
      <tbody>
        <tr v-for='item of store.getPersonTab(person)' :key='item.name'>
          <td>{{item.name}}</td>
          <td>x {{ item.people.filter((x) => x === person).length }}/{{ item.people.length }}</td>
          <td>= {{formatMoney(item.tabValue)}}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td>= {{formatMoney(store.getPersonTab(person).reduce((acc, curr) => acc + curr.tabValue,
          0))}}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<style scoped></style>


