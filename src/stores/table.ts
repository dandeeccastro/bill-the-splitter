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

  function resetTable() {
    people.value = []
    items.value = []
    orders.value = []
    serviceTax.value = 0
  }

  const totalTableValue = computed(() => {
    const fullValue = orders.value.reduce((acc: number, order: Order) => {
      const item = items.value.find((item: Item) => item.name === order.item)
      return acc + item!.value * order.amount
    }, 0)
    return fullValue + Math.floor((fullValue * serviceTax.value) / 100)
  })

  function addPerson(name: string) {
    if (!people.value.includes(name)) {
      people.value.push(name)
    }
  }

  function editPerson(currentName: string, newName: string) {
    const personIdx = people.value.indexOf(currentName)
    if (personIdx >= 0) {
      people.value[personIdx] = newName
      reassignOrders(currentName, newName)
    }
  }

  function removePerson(name: string) {
    const idx = people.value.indexOf(name)
    if (idx >= 0) {
      people.value = people.value.splice(idx, 1)
      deassignOrders(name)
    }
  }

  function addItem(item: Item) {
    const names = items.value.map((item: Item) => item.name)
    if (!names.includes(item.name)) {
      items.value.push(item)
    }
  }

  function editItem(name: string, item: Item) {
    const idx = items.value.findIndex((item) => item.name === name)
    if (idx >= 0) {
      items.value[idx] = item
    }
  }

  function removeItem(name: string) {
    const idx = items.value.findIndex((item) => item.name === name)
    if (idx >= 0) {
      items.value = items.value.splice(idx, 1)
    }
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
    orders.value = orders.value.splice(index, 1)
  }

  function reassignOrders(currentName: string, newName: string) {
    for (const orderIdx in orders.value) {
      const currentPeople = orders.value[orderIdx].people
      if (currentPeople.includes(currentName)) {
        editOrder(parseInt(orderIdx, 10), {
          ...orders.value[orderIdx],
          people: currentPeople.map((person) => (person === currentName ? newName : person)),
        })
      }
    }
  }

  function deassignOrders(name: string) {
    const deassignableOrders = orders.value.reduce((acc: number[], curr: Order, idx: number) => {
      if (curr.people.includes(name)) acc.push(idx)
      return acc
    }, [])

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
    resetTable,
  }
})
