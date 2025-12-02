<script setup lang="ts">
import { ref } from 'vue'
import { useTableStore } from '@/stores/table'

enum FieldModes {
  View,
  Edit, Create,
}

import PersonListItem from '@/components/PersonListItem.vue'
import ItemListItem from '@/components/ItemListItem.vue'
import OrderListItem from '@/components/OrderListItem.vue'

const store = useTableStore()

const selectedTab = ref('Pedidos')

const createPerson = ref(false)
const createItem = ref(false)
const createOrder = ref(false)

const editTax = ref(false)

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
      <div class="h-16 flex items-center">
        <h3 class="text-2xl w-full text-center">{{ $t('modal.editTable') }}</h3>
      </div>
      <div class="tabs tabs-border overflow-x-scroll flex-nowrap">
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Pedidos' }"
          @click="selectedTab = 'Pedidos'"
        >{{ $t('modal.orders') }}</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Pessoas' }"
          @click="selectedTab = 'Pessoas'"
        >{{ $t('modal.people') }}</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Itens' }"
          @click="selectedTab = 'Itens'"
        >{{ $t('modal.items') }}</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': selectedTab === 'Outros' }"
          @click="selectedTab = 'Outros'"
        >{{ $t('modal.other') }}</a
        >
      </div>
      <div class="list">
        <div v-if="selectedTab === 'Pedidos'">
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
            <button class="btn btn-primary" @click="createOrder = true">{{$t('modal.addOrder')}}</button>
          </div>
          <OrderListItem v-else :mode="FieldModes.Create" @addOrder="addOrder"></OrderListItem>
        </div>
        <div v-else-if="selectedTab === 'Itens'">
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
            <button class="btn btn-primary" @click="createItem = true">{{$t('modal.addItem')}}</button>
          </div>
          <ItemListItem v-else :mode="FieldModes.Create" @addItem="addItem"></ItemListItem>
        </div>
        <div v-else-if="selectedTab === 'Pessoas'">
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
            <button class="btn btn-primary" @click="createPerson = true">
              {{ $t('modal.addPerson')}}
            </button>
          </div>
          <PersonListItem
            v-else
            :mode="FieldModes.Create"
            @addPerson="addPerson"
            @cancel='createPerson = false'
          ></PersonListItem>
        </div>
        <div v-else>
          <div v-if="!editTax" class="list-row">
            <div class="list-col-grow flex items-center">
              <span class="text-xl">
                {{ $t('modal.serviceTax', { tax: store.serviceTax }) }}%
              </span>
            </div>
            <button class="btn" @click="editTax = true">
              <v-icon class="mx-1" name="md-edit"></v-icon>
            </button>
          </div>
          <div v-else class="list-row">
            <input id="serviceTax" type="number" class="input" v-model="store.serviceTax" />
            <button class="btn" @click="editTax = false">
              <v-icon class="mx-1" name="bi-check-lg"></v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>{{ $t('modal.close') }}</button>
    </form>
  </dialog>
</template>

<style scoped></style>
