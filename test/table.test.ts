import { setActivePinia, createPinia } from 'pinia'
import { expect, it, describe, beforeEach } from 'vitest'
import { useTableStore } from '../src/stores/table'

describe('Table Store Tab Functionality', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should not create a tab for people with no orders', () => {
    const store = useTableStore()

    store.addPerson('Foo')
    store.addPerson('Bar')
    store.addItem({ name: 'Comida', value: 1299 })
    store.addOrder({ amount: 1, item: 'Comida', people: ['Foo'] })

    expect(Object.keys(store.tableTab.tabs)).toContain('Foo')
    expect(Object.keys(store.tableTab.tabs)).not.toContain('Bar')
  })
})

describe('Table Store Math Functions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should calculate a single bill with no service tax correctly', () => {
    const store = useTableStore()
    const orders = [
      { item: { name: 'Soda', value: 899 }, amount: 2 },
      { item: { name: 'Spaghetti', value: 3999 }, amount: 1 },
      { item: { name: 'Brownie', value: 1299 }, amount: 1 },
    ]

    store.addPerson('Person')
    store.serviceTax = 0
    for (const order of orders) {
      store.addItem(order.item)
      store.addOrder({ amount: order.amount, item: order.item.name, people: ['Person'] })
    }

    expect(store.tableTab.tabs['Person'].totalTabValue).toBe(7096)
  })

  it('should split bill for two people with no service tax correctly', () => {
    const store = useTableStore()
    const orders = [
      { item: { name: 'Soda', value: 899 }, amount: 2, people: ['Foo', 'Bar'] },
      { item: { name: 'Spaghetti', value: 3999 }, amount: 1, people: ['Foo', 'Bar'] },
      { item: { name: 'Brownie', value: 1299 }, amount: 1, people: ['Foo', 'Bar'] },
    ]

    store.serviceTax = 0
    store.addPerson('Foo')
    store.addPerson('Bar')
    for (const order of orders) {
      store.addItem(order.item)
      store.addOrder({ amount: order.amount, item: order.item.name, people: order.people })
    }

    expect(store.tableTab.tabs['Foo'].totalTabValue).toBe(store.tableTab.tabs['Bar'].totalTabValue)
    expect(store.tableTab.tabs['Foo'].totalTabValue).toBe(3548)
  })

  it('should split a bill for two with 12% service tax correctly', () => {
    const store = useTableStore()
    const orders = [
      { item: { name: 'Soda', value: 899 }, amount: 2, people: ['Foo', 'Bar'] },
      { item: { name: 'Spaghetti', value: 3999 }, amount: 1, people: ['Foo', 'Bar'] },
      { item: { name: 'Brownie', value: 1299 }, amount: 1, people: ['Foo', 'Bar'] },
    ]

    store.serviceTax = 12
    store.addPerson('Foo')
    store.addPerson('Bar')
    for (const order of orders) {
      store.addItem(order.item)
      store.addOrder({ amount: order.amount, item: order.item.name, people: order.people })
    }

    expect(store.tableTab.tabs['Foo'].totalTabValue).toBe(store.tableTab.tabs['Bar'].totalTabValue)
    expect(store.tableTab.tabs['Foo'].totalTabValue).toBe(3973)
    expect(store.tableTab.leftoverCents).toBe(1)
  })

  it('should split a bill between three people and calculate leftover cents correctly', () => {
    const store = useTableStore()
    const orders = [
      { item: { name: 'Lorem Ipsum', value: 10000 }, amount: 1, people: ['Foo', 'Bar', 'Baz'] },
    ]

    store.serviceTax = 0
    store.addPerson('Foo')
    store.addPerson('Bar')
    store.addPerson('Baz')

    for (const order of orders) {
      store.addItem(order.item)
      store.addOrder({ ...order, item: order.item.name })
    }

    expect(store.tableTab.tabs['Foo'].totalTabValue).toBe(3333)
    expect(store.tableTab.leftoverCents).toBe(1)
  })
})
