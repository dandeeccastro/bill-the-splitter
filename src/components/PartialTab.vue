<script setup lang="ts">
// import { computed } from 'vue'
import { useTableStore } from '@/stores/table'
import { formatMoney } from '@/services/currency'

const store = useTableStore()

function hasOrderedSomething(name: string): boolean {
  return store.tabs[name].orders.length > 0
}
</script>

<template>
  <div v-if="store.totalTableValue > 0">
    <div
      v-for="person of Object.keys(store.tabs).filter(hasOrderedSomething)"
      :key="person"
      class="card shadow"
    >
      <div class="card-body">
        <h2 class="card-title">{{ person }}</h2>
        <table class="table table-sm">
          <tbody>
            <tr v-for="order of store.tabs[person].orders" :key="order.item">
              <td>
                <!-- {{ order.people[person] }}/{{
                  Object.values(order.people).reduce((acc, curr) => acc + curr, 0)
                }} -->
                {{ order.item }} ({{ formatMoney(store.findItem(order.item).value) }})
              </td>
              <td>= {{ formatMoney(order.price || 0) }}</td>
            </tr>
            <tr>
              <td class="font-bold uppercase text-md">Total</td>
              <td>= {{ formatMoney(store.tabs[person].tabValue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-lg text-right w-full px-4">
      <!-- Centavos sobrando: {{ formatMoney(leftoverCents) }} -->
    </div>
  </div>
  <div v-else class="h-128 flex justify-center items-center text-center text-xl mx-8">
    <p>Ainda não há itens adicionados na sua mesa!</p>
  </div>
</template>

<style scoped></style>
