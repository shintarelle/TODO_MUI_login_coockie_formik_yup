import { StorageKey } from './const';

class LocalStorageService {
  key = null;
  constructor(key) {
    this.key = key;
  }
  getData() {
    return localStorage.getItem(this.key);
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
}
const localStorageService = new LocalStorageService(StorageKey);
export default localStorageService;
