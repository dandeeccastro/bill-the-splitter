<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import { formatMoney } from '@/services/currency'

const store = useTableStore()
</script>

<template>
  <table class="table table-sm my-2" v-if="store.totalTableValue > 0">
    <tbody>
      <tr v-for="order in store.orders" :key="order.item">
        <td>
          {{ order.amount }} {{ order.item }} ({{
            formatMoney(store.items.find((item) => item.name === order.item)!.value)
          }})
        </td>
        <td>
          =
          {{
            formatMoney(store.items.find((item) => item.name === order.item)!.value * order.amount)
          }}
        </td>
      </tr>
      <tr>
        <td class="font-bold uppercase text-md">Total</td>
        <td>= {{ formatMoney(store.totalTableValue) }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else class="h-128 flex justify-center items-center text-center text-xl mx-8">
    <p>Ainda não há pedidos adicionados na sua mesa!</p>
  </div>
</template>

<style scoped></style>
