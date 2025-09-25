<script setup lang="ts">
import { ref } from 'vue';
import { useTableStore } from '@/stores/table';
import TotalTab from '@/components/TotalTab.vue';
import PartialTab from '@/components/PartialTab.vue';

const store = useTableStore();
// NOTE: Testing a type of input
store.addPerson('Danilo')
store.addPerson('Stephanie')
store.addPerson('Marta')
store.addPerson('Luiz')
store.addPerson('Matheus')

store.addItem('Refri', 799, 1, ['Danilo'])
store.addItem('Chá', 899, 1, ['Stephanie'])
store.addItem('Ribs pra dois', 12999, 1, ['Danilo', 'Stephanie'])
store.addItem('Docinho', 2299, 1, ['Danilo', 'Stephanie'])

const selectedTab = ref('Total');
</script>

<template>
  <h1 class='w-full text-center font-bold text-4xl py-4'>Bill the Splitter</h1>
  <div role='tablist' class='tabs tabs-border overflow-x-scroll flex-nowrap'>
    <a role='tab' class='tab' :class="{ 'tab-active': selectedTab === 'Total'}" @click='selectedTab = "Total"'>Total</a>
    <a role='tab' class='tab' :class="{ 'tab-active': selectedTab === 'Por pessoa'}" @click='selectedTab = "Por pessoa"'>Por pessoa</a>
  </div>
  <TotalTab v-if='selectedTab === "Total"'></TotalTab>
  <PartialTab v-if='selectedTab === "Por pessoa"'></PartialTab>
</template>

<style scoped></style>
