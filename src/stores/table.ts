import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Item = {
  name: string,
  value: number,
  amount: number,
  people: Array<string>,
  tabValue?: number,
  leftoverCents?: number,
}

export const useTableStore = defineStore('table', () => {
  // Table state
  const people = ref([] as Array<string>);
  const items = ref({} as { [key: string]: Item });

  // Computed table state
  const totalValue = computed(() => Object.values(items.value).reduce((acc: number, curr: Item) => acc + curr.value * curr.amount, 0));
  const itemCount = computed(() => Object.keys(items.value).length);
  const peopleCount = computed(() => people.value.length);
  const tabs = computed(buildTabs);

  // Person editing functions
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
    removeAssignmentOfItem(name);
  }

  // Item editing functions
  function addItem(name: string, value: number, amount: number, people: Array<string>) {
    items.value[name] = { name, value, amount, people } as Item;
  }
  function editItem(currentName: string, newName: string, newValue: number, newAmount: number, newPeople: Array<string>) {
    const currentItem = items.value[currentName] as Item;
    if (currentItem) {
      items.value[currentName] = {
        name: newName || currentItem.name,
        value: newValue || currentItem.value,
        amount: newAmount || currentItem.amount,
        people: newPeople || currentItem.people,
      }
    }
  }
  function removeItem(name: string) {
    delete items.value[name];
  }

  // Internal functions
  function reassignItems(oldName: string, newName: string) {
    for (const itemName of Object.keys(items.value)) {
      const itemData = items.value[itemName];
      if (itemData.people.includes(oldName)) {
        items.value[itemName].people = itemData.people.map((x) => x === oldName ? newName : x);
      }
    }
  }
  function removeAssignmentOfItem(name: string) {
    for (const itemName of Object.keys(items.value)) {
      const itemData = items.value[itemName] as Item;
      if (itemData.people.includes(name)) {
        items.value[itemName].people = itemData.people.filter((x) => x !== name);
      }
    }
  }
  function calculateTabValue(item: Item, name: string) {
    const val = item.value * item.amount * item.people.filter((x: string) => x === name).length;
    const intPart = Math.floor(val / item.people.length);
    const floatPart = val % item.people.length;
    return { tabValue: intPart, leftoverCents: floatPart };
  }
  function buildTabs() {
    const result = {} as { [key: string]: Item[] };
    for (const person of people.value) {
      result[person] = getPersonTab(person);
    }
    return result;
  }
  function getPersonTab(name: string) {
    const orderedItems = Object.values(items.value).filter((item) => item.people.includes(name));
    return orderedItems.map((item) => ({ ...item, ...calculateTabValue(item, name) }))
  };


  return { people, editPerson, addPerson, removePerson, items, addItem, editItem, removeItem, getPersonTab, totalValue, itemCount, peopleCount, tabs }
})
