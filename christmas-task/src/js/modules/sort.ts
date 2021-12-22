import ToysCards from './toysCards';
import Filters from './filters';
import { Data } from '../interfaces';
import LocalStorage from './localStorage';

class Sorted {
  static sortCards(order) {
    const sortData = LocalStorage.loadData();
    const sortType: string = order.split('-')[1];
    const direction: string = order.split('-')[2];
    const sortedData: Array<Data> = sortData.sort(this.sortData(sortType, direction));
    Filters.clearToys();
    ToysCards.render(sortedData);
    LocalStorage.saveData(sortedData);
  }

  static init() {
    const sortTypesList = document.querySelector('.sort-select') as HTMLSelectElement;
    sortTypesList.addEventListener('change', () => {
      this.sortCards(sortTypesList.value);
      LocalStorage.saveSortValue(sortTypesList.selectedIndex);
    });
  }

  static sortData(field, direction) {
    if (direction === 'max') {
      if (field === 'count') {
        return (a: object, b: object) => (Number(a[field]) > Number(b[field]) ? 1 : -1);
      }
      return (a: object, b: object) => (a[field] > b[field] ? 1 : -1);
    }
    if (field === 'count') {
      return (a: object, b: object) => (Number(a[field]) < Number(b[field]) ? 1 : -1);
    }
    return (a: object, b: object) => (a[field] < b[field] ? 1 : -1);
  }
}

export default Sorted;
