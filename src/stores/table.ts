import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Item = {
  name: string,
  value: number,
  amount: number,
  people: { [key: string]: number },
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
  function addItem(item: Item) {
    items.value[item.name] = item;
  }
  function editItem(currentName: string, item: Item) {
    const currentItem = items.value[currentName] as Item;
    if (currentItem) {
      items.value[currentName] = {
        name: item.name || currentItem.name,
        value: item.value || currentItem.value,
        amount: item.amount || currentItem.amount,
        people: item.people || currentItem.people,
      }
    }
  }
  function removeItem(name: string) {
    delete items.value[name];
  }

  // Internal functions
  function reassignItems(oldName: string, newName: string) {
    for (const itemName of Object.keys(items.value)) {
      if (items.value[itemName].people[oldName]) {
        items.value[itemName].people[newName] = items.value[itemName].people[oldName];
        delete items.value[itemName].people[oldName];
      }
    }
  }
  function removeAssignmentOfItem(name: string) {
    for (const itemName of Object.keys(items.value)) {
      delete items.value[itemName].people[name];
    }
  }
  function calculateTabValue(item: Item, name: string) {
    const val = item.value * item.amount * item.people[name];
    const intPart = Math.floor(val / Object.values(item.people).reduce((acc, curr) => acc + curr, 0));
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
    const orderedItems = Object.values(items.value).filter((item) => Object.keys(item.people).includes(name));
    return orderedItems.map((item) => ({ ...item, ...calculateTabValue(item, name) }))
  };


  return { people, editPerson, addPerson, removePerson, items, addItem, editItem, removeItem, getPersonTab, totalValue, itemCount, peopleCount, tabs }
})
