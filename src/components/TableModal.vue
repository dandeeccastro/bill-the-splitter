<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTableStore } from '@/stores/table';

const store = useTableStore();

enum ModalModes {
  Read,
  EditPerson,
  EditItem,
  CreatePerson,
  CreateItem,
}

const mode = ref(ModalModes.Read);
const title = computed(() => {
  switch (mode.value) {
    case ModalModes.Read:
      return 'Editar Mesa';
    default:
      return 'Kek';
  }
})

const selectedTab = ref('Pessoas');
function formatMoney(value: number) {
  return `R$ ${value/100}`
}
</script>

<template>
  <dialog class="modal" id="poggiesmodal">
    <div class="modal-box h-7/10">
      <h3 class="text-2xl w-full text-center">{{title}}</h3>
      <div role='tablist' class='tabs tabs-border overflow-x-scroll flex-nowrap'>
        <a role='tab' class='tab' :class="{ 'tab-active': selectedTab === 'Pessoas'}" @click='selectedTab= "Pessoas"'>Pessoas</a>
        <a role='tab' class='tab' :class="{ 'tab-active': selectedTab === 'Itens'}" @click='selectedTab = "Itens"'>Itens</a>
      </div>
      <div v-if="selectedTab === 'Pessoas'">
        <div class="list">
          <div class="list-row flex justify-between" v-for='person of store.people' :key='person'>
            <div>{{person}}</div>
            <div>
              <v-icon class='mx-1' name='md-edit'></v-icon>
              <v-icon class='mx-1' name='md-delete-outlined'></v-icon>
            </div>
          </div>
          <div class="list-row flex justify-center"><button class="btn">Adicionar pessoa</button></div>
        </div>
      </div>
      <div v-if='selectedTab === "Itens"'>
        <div class="list">
          <div class="list-row" v-for='item of store.items' :key='item.name'>


            <div class="list-col-grow">
              {{item.amount}} {{item.name}} ({{formatMoney(item.value)}})
            </div>
            <div class="list-col-wrap">
              <span v-for='person in item.people' :key='person'  class="badge">{{person}}</span>
            </div>
            <div>
              <v-icon class='mx-1' name='md-edit'></v-icon>
              <v-icon class='mx-1' name='md-delete-outlined'></v-icon>
            </div>
          </div>
          <div class="list-row flex justify-center"><button class="btn">Adicionar item</button></div>
        </div>
      </div>
    </div>
    <form method='dialog' class="modal-backdrop">
      <button>Fechar</button>
    </form>
  </dialog>
</template>

<style scoped></style>

