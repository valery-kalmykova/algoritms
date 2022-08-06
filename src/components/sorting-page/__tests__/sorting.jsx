import { selectionSort, bubbleSort } from '../utils';
import { ElementStates } from "../../../types/element-states";

const array = [
  {el: 5, color: ElementStates.Default},
  {el: 25, color: ElementStates.Default},
  {el: 15, color: ElementStates.Default},
  {el: 7, color: ElementStates.Default},
  {el: 22, color: ElementStates.Default},
]
const sortedArray = [
  {el: 5, color: ElementStates.Modified},
  {el: 7, color: ElementStates.Modified},
  {el: 15, color: ElementStates.Modified},
  {el: 22, color: ElementStates.Modified},
  {el: 25, color: ElementStates.Modified},
]

describe('sorting page tests', () => {

  jest.setTimeout(10 * 1000);
  it('selection sort few elements', async () => {
    const sort = await selectionSort(array, 'ascending', ()=>{})
    expect(sort).toEqual(sortedArray);
  })

  it('bubble sort few elements', async () => {
    const sort = await bubbleSort(array, 'ascending', ()=>{})
    expect(sort).toEqual(sortedArray);
  })

  it('selection sort one element', async () => {
    const sort = await selectionSort([{el: 5, color: ElementStates.Default}], 'ascending', ()=>{})
    expect(sort).toEqual([{el: 5, color: ElementStates.Modified}]);
  })

  it('bubble sort one element', async () => {
    const sort = await selectionSort([{el: 5, color: ElementStates.Default}], 'ascending', ()=>{})
    expect(sort).toEqual([{el: 5, color: ElementStates.Modified}]);
  })

  it('selection sort empty array', async () => {
    const sort = await selectionSort([], 'ascending', ()=>{})
    expect(sort).toEqual([]);
  })

  it('bubble sort empty array', async () => {
    const sort = await selectionSort([], 'ascending', ()=>{})
    expect(sort).toEqual([]);
  })

})