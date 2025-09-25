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

function calculateLeftoverCents() {
  const tabsTotal = Object.values(tabs.value).reduce((acc, curr) => acc + curr.reduce((acc, curr) => acc +
  curr.tabValue, 0), 0);
  return store.totalValue - tabsTotal;
}

const tabs = ref(buildTabs());
const people = computed(() => Object.keys(tabs.value));
const leftoverCents = computed(calculateLeftoverCents);
// const leftoverCents = computed(() => Object.values(tabs).reduce((acc, curr) => acc +
  // curr.reduce((acc, curr), 0)
// const leftoverCents = computed(() => Object.values(tabs).reduce((acc, tab) => acc + tab.reduce((acc,
//   item) => acc + item.leftoverCents, 0), 0))
</script>

<template>
  <div v-for='person of people' :key='person' class='overflow-x-auto py-4'>
    <h2 class="text-xl center w-full font-semibold px-6">{{person}}</h2>
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
          <td>= {{formatMoney(tabs[person].reduce((acc, curr) => acc + curr.tabValue,
          0))}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h3 class='text-md w-full font-semibold px-6'>Sobrando: {{formatMoney(leftoverCents)}}</h3>
</template>

<style scoped></style>
