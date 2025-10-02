<script setup lang="ts">
import { computed } from 'vue'
import { useTableStore } from '@/stores/table'
import { formatMoney } from '@/services/currency'

type Item = {
  name: string
  value: number
  amount: number
  people: { [key: string]: number }
  tabValue?: number
  leftoverCents?: number
}

const store = useTableStore()

const people = computed(() => Object.keys(store.tabs))
const leftoverCents = computed(() => {
  const calculatedTotal = Object.values(store.tabs).reduce(
    (acc, curr) => acc + totalTabValue(curr),
    0,
  )
  return store.totalValue - calculatedTotal
})

function totalTabValue(tab: Item[]): number {
  return tab.reduce((acc: number, curr: Item) => acc + (curr.tabValue || 0), 0)
}

function hasOrderedSomething(name: string): boolean {
  return totalTabValue(store.tabs[name]) > 0
}
</script>

<template>
  <div v-if="store.totalValue > 0">
    <div v-for="person of people.filter(hasOrderedSomething)" :key="person" class="card shadow">
      <div class="card-body">
        <h2 class="card-title">{{ person }}</h2>
        <table class="table table-sm">
          <tbody>
            <tr v-for="item of store.tabs[person]" :key="item.name">
              <td>
                {{ item.people[person] }}/{{
                  Object.values(item.people).reduce((acc, curr) => acc + curr, 0)
                }}
                {{ item.name }} ({{ formatMoney(item.value) }})
              </td>
              <td>= {{ formatMoney(item.tabValue || 0) }}</td>
            </tr>
            <tr>
              <td class="font-bold uppercase text-md">Total</td>
              <td>= {{ formatMoney(totalTabValue(store.tabs[person])) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-lg text-right w-full px-4">
      Centavos sobrando: {{ formatMoney(leftoverCents) }}
    </div>
  </div>
  <div v-else class="h-128 flex justify-center items-center text-center text-xl mx-8">
    <p>Ainda não há itens adicionados na sua mesa!</p>
  </div>
</template>

<style scoped></style>
