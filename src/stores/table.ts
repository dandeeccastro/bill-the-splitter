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
  function editPerson(name: string, newName: string) {
    const index = people.value.indexOf(name);
    people.value[index] = newName;
    reassignItems(name, newName);
  }
  function addPerson(newPerson: string) {
    people.value.push(newPerson);
  }
  function removePerson(name: string) {
    const index = people.value.indexOf(name);
    people.value.splice(index, 1);
    for (const itemName of Object.keys(items.value)) {
      if (items.value[itemName].people.includes(name)) {
        items.value[itemName].people = items.value[itemName].people.filter((x) => x !== name);
      }
    }
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
  function reassignItems(oldName: string, newName: string) {
    for (const itemName of Object.keys(items.value)) {
      if (items.value[itemName].people.includes(oldName)) {
        items.value[itemName].people = items.value[itemName].people.map((x) => x === oldName ? newName : x);
      }
    }
  }

  function calculateTabValue(item: Item, name: string) {
    const val = item.value * item.amount * item.people.filter((x: string) => x === name).length;
    const intPart = Math.floor(val / item.people.length);
    const floatPart = val % item.people.length;
    return { tabValue: intPart, leftoverCents: floatPart };
  }

  function getPersonTab(name: string) {
    const orderedItems = Object.values(items.value).filter((item) => item.people.includes(name));
    return orderedItems.map((item) => ({ ...item, ...calculateTabValue(item, name) }))
  };

  const totalValue = computed(() => Object.values(items.value).reduce((acc: number, curr: Item) => acc + curr.value * curr.amount, 0))

  return { people, editPerson, addPerson, removePerson, items, addItem, editItem, removeItem, getPersonTab, totalValue }
})
