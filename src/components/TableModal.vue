<script setup lang="ts">
import { ref } from 'vue';
import { useTableStore } from '@/stores/table';

import PersonListItem from '@/components/PersonListItem.vue';
import ItemListItem from '@/components/ItemListItem.vue';

const store = useTableStore();

const selectedTab = ref('Pessoas');

</script>

<template>
  <dialog class="modal" id="poggiesmodal">
    <div class="modal-box h-7/10">
      <h3 class="text-2xl w-full text-center">Editar mesa</h3>
      <div role='tablist' class='tabs tabs-border overflow-x-scroll flex-nowrap'>
        <a
          role='tab'
          class='tab'
          :class="{ 'tab-active': selectedTab === 'Pessoas'}"
          @click='selectedTab= "Pessoas"'
        >Pessoas</a>
        <a
          role='tab'
          class='tab'
          :class="{ 'tab-active': selectedTab === 'Itens'}"
          @click='selectedTab = "Itens"'
        >Itens</a>
      </div>
      <div v-if="selectedTab === 'Pessoas'">
        <div class="list">
          <PersonListItem
            v-for='person of store.people'
            :key='person'
            :person='person'
            @editPerson='store.editPerson'
            @deletePerson='store.removePerson'
          ></PersonListItem>
          <div class="list-row flex justify-center">
            <button
              class="btn btn-primary"
              @click='store.addPerson(`Pessoa ${store.peopleCount}`)'
            >Adicionar pessoa</button>
          </div>
        </div>
      </div>
      <div v-if='selectedTab === "Itens"'>
        <div class="list">
          <ItemListItem
            v-for='item of store.items'
            :key='item.name'
            :item='item'
            @editItem='store.editItem'
            @deleteItem='store.removeItem'
          ></ItemListItem>
          <div class="list-row flex justify-center">
            <button
              class="btn btn-primary"
              @click='store.addItem(`Item ${store.itemCount}`, 0, 1, [])'
            >Adicionar item</button>
          </div>
        </div>
      </div>
    </div>
    <form method='dialog' class="modal-backdrop">
      <button>Fechar</button>
    </form>
  </dialog>
</template>

<style scoped></style>

