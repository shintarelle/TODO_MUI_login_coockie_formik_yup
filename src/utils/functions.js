import { StorageKey } from './const';

class LocalStorageService {
  key = null;
  constructor(key) {
    this.key = key;
  }
  getData() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }
  setData(data) {
    if (!Array.isArray(data)) {
      throw new Error('data should be an array');
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  saveItem(data) {
    if (!data.id) throw new Error('no id on todo item');
    const saveData = this.getData();
    const newData = [data, ...saveData];
    localStorage.setItem(this.key, JSON.stringify(newData));
    return this.getData().at(-1);
  }
  deleteItem(id) {
    const localStorageData = this.getData();
    const filterItems = localStorageData.filter(item => item.id !== id);
    this.setData(filterItems);
    return filterItems;
  }
  updateItemStatus(id, newStatus) {
    const localStorageData = this.getData();
    const updatedTodoItems = localStorageData.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    this.setData(updatedTodoItems);
    return updatedTodoItems;
  }
}
const localStorageService = new LocalStorageService(StorageKey);
export default localStorageService;
