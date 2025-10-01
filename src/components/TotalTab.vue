<script setup lang="ts">
import { useTableStore } from '@/stores/table';
import { formatMoney } from '@/services/currency';

const store = useTableStore();
</script>

<template>
    <table class="table table-sm my-2">
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
</template>

<style scoped></style>

