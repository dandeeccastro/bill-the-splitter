<script setup lang="ts">
import { ref } from 'vue'
import { useTableStore } from '@/stores/table'

enum FieldModes {
  View,
  Edit,
  Create,
}

import PersonListItem from '@/components/PersonListItem.vue'
import ItemListItem from '@/components/ItemListItem.vue'
import OrderListItem from '@/components/OrderListItem.vue'

const store = useTableStore()

const selectedTab = ref('Pedidos')

const createPerson = ref(false)
const createItem = ref(false)
const createOrder = ref(false)

function addOrder(order: { item: string; amount: number; people: Array<string> }) {
  store.addOrder(order)
  createOrder.value = false
}

function addPerson(person: string) {
  store.addPerson(person)
  createPerson.value = false
}

function addItem(item: { name: string; value: number }) {
  store.addItem(item)
  createItem.value = false
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
            v-for="(order, index) of store.orders"
            :order="order"
            :key="`${order.amount}-${order.item}-${index}`"
            :mode="FieldModes.View"
            :index="index"
            @editOrder="store.editOrder"
            @deleteOrder="store.removeOrder"
          ></OrderListItem>
          <div v-if="!createOrder" class="list-row flex justify-center">
            <button class="btn btn-primary" @click="createOrder = true">Adicionar pedido</button>
          </div>
          <OrderListItem v-else :mode="FieldModes.Create" @addOrder="addOrder"></OrderListItem>
        </div>
      </div>
      <div v-else-if="selectedTab === 'Itens'">
        <div class="list">
          <ItemListItem
            v-for="(item, index) of store.items"
            :key="item.name"
            :item="item"
            :index="index"
            :mode="FieldModes.View"
            @editItem="store.editItem"
            @deleteItem="store.removeItem"
          ></ItemListItem>
          <div v-if="!createItem" class="list-row flex justify-center">
            <button class="btn btn-primary" @click="createItem = true">Adicionar item</button>
          </div>
          <ItemListItem v-else :mode="FieldModes.Create" @addItem="addItem"></ItemListItem>
        </div>
      </div>
      <div v-else-if="selectedTab === 'Pessoas'">
        <div class="list">
          <PersonListItem
            v-for="(person, index) of store.people"
            :key="person"
            :person="person"
            :index="index"
            :mode="FieldModes.View"
            @editPerson="store.editPerson"
            @deletePerson="store.removePerson"
          ></PersonListItem>
          <div v-if="!createPerson" class="list-row flex justify-center">
            <button class="btn btn-primary" @click="createPerson = true">Adicionar pessoa</button>
          </div>
          <PersonListItem v-else :mode="FieldModes.Create" @addPerson="addPerson"></PersonListItem>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Fechar</button>
    </form>
  </dialog>
</template>

<style scoped></style>
