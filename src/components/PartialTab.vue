<script setup lang="ts">
// import { computed } from 'vue'
import { useTableStore } from '@/stores/table'
import { formatMoney } from '@/services/currency'

const store = useTableStore()

function hasOrderedSomething(name: string): boolean {
  return store.tableTab.tabs[name].orders.length > 0
}
</script>

<template>
  <div v-if="store.totalTableValue > 0">
    <div
      v-for="person of Object.keys(store.tableTab.tabs).filter(hasOrderedSomething)"
      :key="person"
      class="card shadow"
    >
      <div class="card-body">
        <h2 class="card-title">{{ person }}</h2>
        <table class="table table-sm">
          <tbody>
            <tr v-for="order of store.tableTab.tabs[person].orders" :key="order.item">
              <td>
                {{ order.item }} ({{ $n(store.findItem(order.item).value / 100, 'currency') }})
              </td>
              <td>= {{ $n(order.price / 100 || 0, 'currency') }}</td>
            </tr>
            <tr>
              <td class="font-bold uppercase text-md">Total</td>
              <td>= {{ $n(store.tableTab.tabs[person].tabValue / 100, 'currency') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-lg text-right w-full px-4">
      {{ $t('leftoverCents', { cents: $n(store.tableTab.leftoverCents / 100, 'currency')})}}
    </div>
  </div>
  <div v-else class="h-128 flex justify-center items-center text-center text-xl mx-8">
    <p>{{ $t('noOrders') }}</p>
  </div>
</template>

<style scoped></style>
