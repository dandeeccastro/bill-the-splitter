import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Item = {
  name: string,
  value: number,
  amount: number,
  people: Array<string>,
}

export const useTableStore = defineStore('table', () => {
  const people = ref([] as Array<string>);
  function editPerson(index: number, newName: string) {
    people.value[index] = newName;
  }
  function addPerson(newPerson: string) {
    people.value.push(newPerson);
  }
  function removePerson(name: string) {
    const index = people.value.indexOf(name);
    people.value.splice(index, 1);
  }

  const items = ref({} as Map<string, Item>);
  function addItem(name: string, value: number, amount: number, people: Array<string>) {
    items.value[name] = { name, value, amount, people } as Item;
  }
  function editItem(currentName: string, newName: string, newValue: number, newAmount: number, newPeople: Array<string>) {
    const currentItem = items.value[currentName] as Item;
    if (currentItem) {
      items.value.set(currentName, {
        name: newName || currentItem.name,
        value: newValue || currentItem.value,
        amount: newAmount || currentItem.amount,
        people: newPeople || currentItem.people,
      })
    }
  }
  function removeItem(name: string) {
    items.value.delete(name);
  }

  // function calculateTabValue = (item: Item, name: string)

  function getPersonTab(name: string) {
    const orderedItems = Object.values(items.value).filter((item) => item.people.includes(name));
    const calculateTabValue = (item: Item) => item.value * item.amount * item.people.filter((x: string) => x === name).length / item.people.length;
    return orderedItems.map((item) => ({ ...item, tabValue: calculateTabValue(item) }))
  };

  const totalValue = computed(() => Object.values(items.value).reduce((acc: number, curr: Item) => acc + curr.value * curr.amount, 0))

  return { people, editPerson, addPerson, removePerson, items, addItem, editItem, removeItem, getPersonTab, totalValue }
})
