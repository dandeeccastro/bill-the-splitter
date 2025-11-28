<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import TotalTab from '@/components/TotalTab.vue'
import PartialTab from '@/components/PartialTab.vue'
import TableModal from '@/components/TableModal.vue'
import { useTableStore } from './stores/table'
import { onMounted } from 'vue'

const selectedTab = ref('Total')
const store = useTableStore()
const route = useRoute()
const { locale, availableLocales } = useI18n()

function defineLocale() {
  // Setting by query param
  const queryLang = route.query?.lang as string
  if (queryLang && availableLocales.includes(queryLang)) {
    locale.value = queryLang
    return
  }
  // Setting by system language
  for (const spokenLocale of navigator.languages) {
    if (availableLocales.includes(spokenLocale)) {
      locale.value = spokenLocale
      return
    }
  }
}

onBeforeMount(() => {
  store.setup()
  defineLocale()
})

onMounted(() => {
  const tableModal = document.getElementById('tableEditModal')
  tableModal!.addEventListener('close', () => {
    store.save()
  })
})
</script>

<template>
  <h1 class="w-full text-center font-bold text-4xl py-4">Bill the Splitter</h1>
  <div role="tablist" class="tabs tabs-border overflow-x-scroll flex-nowrap">
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': selectedTab === $t('total') }"
      @click="selectedTab = $t('total')"
      >{{ $t('total') }}</a
    >
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': selectedTab === $t('perPerson') }"
      @click="selectedTab = $t('perPerson')"
      >{{ $t('perPerson') }}</a
    >
  </div>
  <TotalTab v-if="selectedTab === $t('total')"></TotalTab>
  <PartialTab v-if="selectedTab === $t('perPerson')"></PartialTab>
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
