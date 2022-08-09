import { compare } from "../utils";
import { ElementStates } from "../../../types/element-states";

const evenArr = [
  {el: '1', color: ElementStates.Default},
  {el: '2', color: ElementStates.Default},
  {el: '3', color: ElementStates.Default},
  {el: '4', color: ElementStates.Default},
];
const evenArrReverse = [
  {el: '4', color: ElementStates.Modified},
  {el: '3', color: ElementStates.Modified},
  {el: '2', color: ElementStates.Modified},
  {el: '1', color: ElementStates.Modified},
];
const notEvenArr = [
  ...evenArr,
  {el: '5', color: ElementStates.Default},
];
const notEvenArrReverse = [
  {el: '5', color: ElementStates.Modified},
  ...evenArrReverse
]

describe('string algorithm test', () => {
  jest.setTimeout(10 * 1000);
  it('reverse string with even elements', async() => {
    const compareStr = await compare(evenArr, ()=>{});
    expect(compareStr).toEqual(evenArrReverse)
  })

  it('reverse string with not even elements', async() => {
    const compareStr = await compare(notEvenArr, ()=>{});    
    expect(compareStr).toEqual(notEvenArrReverse)
  })

  it('reverse string with one element', async() => {
    const compareStr = await compare([{el: '1', color: ElementStates.Default}], ()=>{});
    expect(compareStr).toEqual([{el: '1', color: ElementStates.Modified}])
  })

  it('reverse empty string', async() => {
    const compareStr = await compare([], ()=>{});
    expect(compareStr).toEqual([])
  })

})