<script setup lang="ts">
import { useTableStore } from '@/stores/table';

const store = useTableStore();

function formatMoney(value: number) {
  return `R$ ${value/100}`
}
</script>

<template>
  <div class='overflow-x-auto'>
    <h2 class="text-xl w-full text-center font-semibold py-2">Total da mesa</h2>
    <table class='table table-sm px-4'>
      <tbody>
        <tr v-for='item in store.items' :key='item.name'>
          <td>{{item.name}}</td>
          <td>{{formatMoney(item.value)}}</td>
          <td>x {{item.amount}}</td>
          <td>= {{formatMoney(item.value * item.amount)}}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td>{{formatMoney(store.totalValue)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

