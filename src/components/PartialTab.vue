<script setup lang="ts">
import { computed } from 'vue';
import { useTableStore } from '@/stores/table';
import { formatMoney } from '@/services/currency';

const store = useTableStore();

const people = computed(() => Object.keys(store.tabs));
const leftoverCents = computed(() => {
  const calculatedTotal = Object.values(store.tabs).reduce((acc, curr) => acc + totalTabValue(curr), 0);
  return store.totalValue - calculatedTotal;
});

function totalTabValue(tab) {
  return tab.reduce((acc, curr) => acc + curr.tabValue, 0);
}
</script>

<template>
  <div v-for='person of people.filter((p) => totalTabValue(store.tabs[p]) > 0)' :key='person' class='overflow-x-auto py-4'>
    <h2 class="text-xl center w-full font-semibold px-2">{{person}}</h2>
    <table class='table table-sm px-4'>
      <tbody>
        <tr v-for='item of store.tabs[person]' :key='item.name'>
          <td>{{item.name}}</td>
          <td>x {{ item.people.filter((x) => x === person).length }}/{{ item.people.length }}</td>
          <td>= {{formatMoney(item.tabValue)}}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td>= {{formatMoney(totalTabValue(store.tabs[person]))}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3 class='text-md text-right w-full px-4'>Sobrando: {{formatMoney(leftoverCents)}}</h3>
</template>

<style scoped></style>
