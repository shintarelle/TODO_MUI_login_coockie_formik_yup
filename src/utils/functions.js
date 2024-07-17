import { StorageKey } from './const';

class LocalStorageService {
  key = null;
  constructor(key) {
    this.key = key;
  }
  getData() {
    return JSON.parse(localStorage.getItem(this.key));
  }
  setData(data) {
    if (!Array.isArray(data)) {
      throw new Error('data should be an array');
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  saveItem(data) {
    if (!data.id) throw new Error('no id on todo item');
    const saveData = JSON.parse(this.getData());
    const newData = [data, ...saveData];
    localStorage.setItem(this.key, JSON.stringify(newData));
    return this.getData().at(-1);
  }
  deleteItem(id) {
    const localStorageData = JSON.parse(this.getData());
    const filterItems = localStorageData.filter(item => item.id !== id);
    this.setData(filterItems);
  }
  updateItem(id, fieldValue) {
    const localStorageData = JSON.parse(this.getData());
    const updatedTodoItems = localStorageData.map(item => {
      if (item.id === id) {
        return { ...item, status: fieldValue };
      }
      return item;
    });
    this.setData(updatedTodoItems);
  }
}
const localStorageService = new LocalStorageService(StorageKey);
export default localStorageService;
