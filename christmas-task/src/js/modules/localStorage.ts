import data from '../data';

class LocalStorage {
  static saveData(filteredData, activeFilters) {
    localStorage.setItem('data', JSON.stringify(filteredData));
    localStorage.setItem('filters', JSON.stringify(activeFilters));
  }

  static loadData() {
    const checkedData = localStorage.getItem('data');
    if (checkedData !== null) {
      return JSON.parse(checkedData);
    }
    return data;
  }
}

export default LocalStorage;
