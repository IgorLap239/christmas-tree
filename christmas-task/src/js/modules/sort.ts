import ToysCards from './toysCards';
import Filters from './filters';
import { Data } from '../interfaces';
import LocalStorage from './localStorage';

class Sorted {
  static sortCards() {
    const sortTypesList = document.querySelector('.sort-select') as HTMLSelectElement;
    sortTypesList.addEventListener('change', () => {
      const sortData = LocalStorage.loadData();
      const sortType: string = sortTypesList.value.split('-')[1];
      const direction: string = sortTypesList.value.split('-')[2];
      const sortedData: Array<Data> = sortData.sort(this.sortData(sortType, direction));
      Filters.clearToys();
      ToysCards.render(sortedData);
      LocalStorage.saveData(sortedData);
      LocalStorage.saveSortValue(sortTypesList.value);
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
