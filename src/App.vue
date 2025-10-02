<script setup lang="ts">
import { ref } from 'vue'

import TotalTab from '@/components/TotalTab.vue'
import PartialTab from '@/components/PartialTab.vue'
import TableModal from '@/components/TableModal.vue'

const selectedTab = ref('Total')
</script>

<template>
  <h1 class="w-full text-center font-bold text-4xl py-4">Bill the Splitter</h1>
  <div role="tablist" class="tabs tabs-border overflow-x-scroll flex-nowrap">
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': selectedTab === 'Total' }"
      @click="selectedTab = 'Total'"
      >Total</a
    >
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': selectedTab === 'Por pessoa' }"
      @click="selectedTab = 'Por pessoa'"
      >Por pessoa</a
    >
  </div>
  <TotalTab v-if="selectedTab === 'Total'"></TotalTab>
  <PartialTab v-if="selectedTab === 'Por pessoa'"></PartialTab>
  <div class="h-20"></div>
  <button
    class="btn btn-xl btn-circle btn-active absolute bottom-4 right-4 shadow"
    onclick="tableEditModal.showModal()"
  >
    <v-icon name="md-edit"></v-icon>
  </button>
  <TableModal></TableModal>
</template>

<style scoped></style>
