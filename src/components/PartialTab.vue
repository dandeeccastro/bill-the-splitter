<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTableStore } from '@/stores/table';

const store = useTableStore();

function formatMoney(value: number) {
  return `R$ ${value/100}`
}

function buildTabs() {
  const result = {};
  for (const person of store.people) {
    result[person] = store.getPersonTab(person);
  }
  return result;
}

function totalTabValue(tab) {
  return tab.reduce((acc, curr) => acc + curr.tabValue, 0);
}

function calculateLeftoverCents() {
  const tabsTotal = Object.values(tabs.value).reduce((acc, curr) => acc + totalTabValue(curr), 0);
  return store.totalValue - tabsTotal;
}

const tabs = computed(buildTabs);
const people = computed(() => Object.keys(tabs.value));
const leftoverCents = computed(calculateLeftoverCents);
</script>

<template>
  <div v-for='person of people.filter((p) => totalTabValue(tabs[p]) > 0)' :key='person' class='overflow-x-auto py-4'>
    <h2 class="text-xl center w-full font-semibold px-2">{{person}}</h2>
    <table class='table table-sm px-4'>
      <tbody>
        <tr v-for='item of tabs[person]' :key='item.name'>
          <td>{{item.name}}</td>
          <td>x {{ item.people.filter((x) => x === person).length }}/{{ item.people.length }}</td>
          <td>= {{formatMoney(item.tabValue)}}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td>= {{formatMoney(totalTabValue(tabs[person]))}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3 class='text-md text-right w-full px-4'>Sobrando: {{formatMoney(leftoverCents)}}</h3>
</template>

<style scoped></style>
