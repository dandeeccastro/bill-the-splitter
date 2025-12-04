import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Item {
  name: string
  value: number
}

interface Order {
  amount: number
  people: string[]
  item: string
}

interface PersonOrder extends Order {
  price: number
}

interface PersonTab {
  orders: PersonOrder[]
  tabValue: number
  totalTabValue: number
}

interface TableTab {
  tabs: { [key: string]: PersonTab }
  leftoverCents: number
}

export const useTableStore = defineStore('table', () => {
  const people = ref([] as Array<string>)
  const items = ref([] as Array<Item>)
  const orders = ref([] as Array<Order>)
  const serviceTax = ref(12)

  const tableTab = computed(calculateTableTab)

  const totalTableValue = computed(() => {
    const fullValue = orders.value.reduce((acc: number, order: Order) => {
      const item = items.value.find((item: Item) => item.name === order.item)
      return acc + item!.value * order.amount
    }, 0)
    return fullValue + Math.floor((fullValue * serviceTax.value) / 100)
  })

  function setup() {
    const localServiceTax = window.localStorage.getItem('bill-the-splitter.serviceTax')
    if (localServiceTax !== null && localServiceTax !== '') {
      serviceTax.value = parseInt(localServiceTax, 10)
    }

    const localItems = window.localStorage.getItem('bill-the-splitter.items')
    if (localItems !== null && localItems !== '') {
      items.value = JSON.parse(localItems)
    }

    const localOrders = window.localStorage.getItem('bill-the-splitter.orders')
    if (localOrders !== null && localOrders !== '') {
      orders.value = JSON.parse(localOrders)
    }

    const localPeople = window.localStorage.getItem('bill-the-splitter.people')
    if (localPeople !== null && localPeople !== '') {
      people.value = JSON.parse(localPeople)
    }
  }

  function save() {
    window.localStorage.setItem('bill-the-splitter.serviceTax', serviceTax.value.toString())
    window.localStorage.setItem('bill-the-splitter.items', JSON.stringify(items.value))
    window.localStorage.setItem('bill-the-splitter.orders', JSON.stringify(orders.value))
    window.localStorage.setItem('bill-the-splitter.people', JSON.stringify(people.value))
  }

  function addPerson(name: string) {
    if (!people.value.includes(name)) {
      people.value.push(name)
    }
  }

  function editPerson(index: number, newName: string) {
    if (!people.value.includes(newName)) {
      const currentName = people.value[index]
      people.value[index] = newName
      reassignOrdersToPerson(currentName, newName)
    }
  }

  function removePerson(idx: number) {
    const name = people.value[idx]
    people.value.splice(idx, 1)
    deassignOrdersFromPerson(name)
  }

  function addItem(item: Item) {
    const names = items.value.map((item: Item) => item.name)
    if (!names.includes(item.name)) {
      items.value.push(item)
    }
  }

  function editItem(idx: number, item: Item) {
    const names = items.value.map((item: Item) => item.name)
    if (!names.includes(item.name)) {
      const oldName = items.value[idx].name
      items.value[idx] = item
      reassignOrdersForItem(oldName, item.name)
    }
  }

  function removeItem(idx: number) {
    const name = items.value[idx].name
    items.value.splice(idx, 1)
    deassignOrdersForItem(name)
  }

  function findItem(name: string) {
    return items.value.find((item) => item.name === name)!
  }

  function addOrder(order: Order) {
    orders.value.push(order)
  }

  function editOrder(index: number, newOrder: Order) {
    orders.value[index] = newOrder
  }

  function removeOrder(index: number) {
    orders.value.splice(index, 1)
  }

  function reassignOrdersToPerson(currentName: string, newName: string) {
    for (const orderIdx in orders.value) {
      const iOrderIdx = parseInt(orderIdx, 10);
      const currentPeople = orders.value[iOrderIdx].people
      if (currentPeople.includes(currentName)) {
        const newPeople = currentPeople.map((person) => (person === currentName ? newName : person));

        const newOrder: Order = {
          ...orders.value[iOrderIdx],
          people: newPeople,
        }

        editOrder(iOrderIdx, newOrder);
      }
    }
  }

  function deassignOrdersFromPerson(name: string) {
    const deassignableOrders = orders.value
      .filter((order) => order.people.includes(name))
      .map((_order, idx) => idx)
      .sort((a, b) => b - a)

    for (const idx of deassignableOrders) {
      const newPeople = orders.value[idx].people.filter((person: string) => person !== name)
      if (newPeople.length >= 1) {
        editOrder(idx, {
          ...orders.value[idx],
          people: newPeople,
        })
      } else if (newPeople.length === 0) {
        removeOrder(idx)
      }
    }
  }

  function reassignOrdersForItem(oldName: string, newName: string) {
    orders.value = orders.value.map((order) => ({
      ...order,
      item: order.item === oldName ? newName : order.item,
    }))
  }

  function deassignOrdersForItem(name: string) {
    const deassignableOrders = orders.value
      .reduce((acc: number[], curr: Order, idx: number) => {
        if (curr.item === name) acc.push(idx)
        return acc
      }, [])
      .sort((a, b) => b - a)

    for (const idx of deassignableOrders) removeOrder(idx)
  }

  function calculateOrderValue(order: Order): PersonOrder {
    const item = items.value.find((item: Item) => item.name === order.item)
    const price = Math.floor((item!.value * order.amount) / order.people.length)
    return { ...order, price }
  }

  function calculateTableTab(): TableTab {
    // Calculating tabs with tab values (no cents)
    const allTabs = people.value.reduce((acc: { [key: string]: PersonTab }, person: string) => {
      const personOrders = orders.value
        .filter((order: Order) => order.people.includes(person))
        .map(calculateOrderValue)

      if (personOrders.length === 0) {
        return acc
      }

      const tabValue = personOrders.reduce((acc: number, curr: PersonOrder) => acc + curr.price, 0)
      const totalTabValue = tabValue + Math.floor((tabValue * serviceTax.value) / 100)
      acc[person] = { orders: personOrders, tabValue, totalTabValue }
      return acc
    }, {})

    // How many cents left?
    let leftoverCents = totalTableValue.value
    for (const person in allTabs) {
      leftoverCents -= allTabs[person].totalTabValue
    }

    // How should we divide them?
    const centsToDivide = Math.floor(leftoverCents / Object.keys(allTabs).length)
    const actualLeftoverCents = leftoverCents % Object.keys(allTabs).length

    const correctTabs = Object.keys(allTabs).reduce(
      (acc: { [key: string]: PersonTab }, person: string) => {
        acc[person] = {
          ...allTabs[person],
          tabValue: allTabs[person].tabValue + centsToDivide,
          totalTabValue: allTabs[person].totalTabValue + centsToDivide,
        }
        return acc
      },
      {},
    )

    return { tabs: correctTabs, leftoverCents: actualLeftoverCents }
  }

  return {
    people,
    items,
    orders,
    tableTab,
    serviceTax,
    totalTableValue,
    addPerson,
    editPerson,
    removePerson,
    findItem,
    addItem,
    editItem,
    removeItem,
    addOrder,
    editOrder,
    removeOrder,
    setup,
    save,
  }
})
