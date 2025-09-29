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
      return 'Mesa';
    default:
      return 'Kek';
  }
})
</script>

<template>
  <dialog class="modal" id="poggiesmodal">
    <div class="modal-box">
      <h3 class="text-2xl font-bold w-full text-center">{{title}}</h3>
      <div class="card shadow-lg">
        <div class="card-body">
          <h4 class="card-title">Pessoas</h4>
          <div class="list">
            <div class="list-row flex justify-between" v-for='person of store.people' :key='person'>
              <div>{{person}}</div>
              <div>icones</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card shadow-lg">
        <div class="card-body">
          <h4 class="card-title">Itens</h4>
          <div class="list">
            <div class="list-row" v-for='item of store.items' :key='item.name'>
              <div>{{item.name}}</div>
            </div>
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

