<script setup lang="ts">
import { useTableStore } from '@/stores/table';
import { formatMoney } from '@/services/currency';

const store = useTableStore();
</script>

<template>
  <table class="table table-sm my-2" v-if='store.totalValue > 0'>
    <tbody>
      <tr v-for='item in store.items' :key='item.name'>
        <td>{{ item.amount }} {{ item.name }} ({{formatMoney(item.value)}})</td>
        <td>= {{formatMoney(item.value * item.amount)}}</td>
      </tr>
      <tr>
        <td class='font-bold uppercase text-md'>Total</td>
        <td>= {{formatMoney(store.totalValue)}}</td>
      </tr>
    </tbody>
  </table>
  <div v-else class="h-128 flex justify-center items-center text-center text-xl mx-8">
    <p>Ainda não há itens adicionados na sua mesa!</p>
  </div>
</template>

<style scoped></style>

