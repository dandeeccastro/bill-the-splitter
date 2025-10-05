<script setup lang="ts">
import { ref } from 'vue'
import { useTableStore } from '@/stores/table'

import PersonListItem from '@/components/PersonListItem.vue'
import ItemListItem from '@/components/ItemListItem.vue'
import OrderListItem from '@/components/OrderListItem.vue'

const store = useTableStore()

const selectedTab = ref('Pedidos')

function addMockOrder() {
  const person = `Pessoa ${store.people.length}`
  const item = { name: `Item ${store.items.length}`, value: 0 }
  store.addPerson(person)
  store.addItem(item)
  store.addOrder({ amount: 1, item: item.name, people: [person] })
}
</script>

<template>
  <dialog class="modal" id="tableEditModal">
    <div class="modal-box h-7/10">
      <h3 class="text-2xl w-full text-center">Editar {{ selectedTab }}</h3>
      <div class="tabs tabs-border overflow-x-scroll flex-nowrap">
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Pedidos' }"
          @click="selectedTab = 'Pedidos'"
          >Pedidos</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Pessoas' }"
          @click="selectedTab = 'Pessoas'"
          >Pessoas</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Itens' }"
          @click="selectedTab = 'Itens'"
          >Itens</a
        >
      </div>
      <div v-if="selectedTab === 'Pedidos'">
        <div class="list">
          <OrderListItem
            v-for="order of store.orders"
            :order="order"
            :key="order.toString()"
          ></OrderListItem>
          <div class="list-row flex justify-center">
            <button class="btn btn-primary" @click="addMockOrder">Adicionar pedido</button>
          </div>
        </div>
      </div>
      <div v-else-if="selectedTab === 'Itens'">
        <div class="list">
          <ItemListItem
            v-for="item of store.items"
            :key="item.name"
            :item="item"
            @editItem="store.editItem"
            @deleteItem="store.removeItem"
          ></ItemListItem>
          <div class="list-row flex justify-center">
            <button
              class="btn btn-primary"
              @click="store.addItem({ name: `Item ${store.items.length}`, value: 0 })"
            >
              Adicionar item
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="selectedTab === 'Pessoas'">
        <div class="list">
          <PersonListItem
            v-for="person of store.people"
            :key="person"
            :person="person"
            @editPerson="store.editPerson"
            @deletePerson="store.removePerson"
          ></PersonListItem>
          <div class="list-row flex justify-center">
            <button
              class="btn btn-primary"
              @click="store.addPerson(`Pessoa ${store.people.length}`)"
            >
              Adicionar pessoa
            </button>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Fechar</button>
    </form>
  </dialog>
</template>

<style scoped></style>
