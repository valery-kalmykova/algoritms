import React from "react";
import { ElementStates } from "../../types/element-states";
import { IcolumnsData } from '../../types/types';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, swap } from '../../utils/utils';

export const selectionSort = async (array: IcolumnsData[], direction: string, setColumnData: any) => {
  
  for (let i = 0; i < array.length; i += 1) {
    let indexMin = i;
    array[indexMin].color = ElementStates.Changing;  
    for (let j = i + 1; j < array.length; j += 1) {      
      array[j].color = ElementStates.Changing;
      setColumnData([...array]);
      await delay(SHORT_DELAY_IN_MS);
      if (direction === 'ascending' && array[j].el < array[indexMin].el) {
        indexMin = j;
        array[j].color = ElementStates.Changing;
        array[indexMin].color = i === indexMin ? ElementStates.Changing : ElementStates.Default;
      } else if (direction === 'descending' && array[j].el > array[indexMin].el) {
        indexMin = j;
        array[j].color = ElementStates.Changing;
        array[indexMin].color = i === indexMin ? ElementStates.Changing : ElementStates.Default;
      }
      if (j !== indexMin) array[j].color = ElementStates.Default;

      setColumnData([...array]);
    }

    swap(array, i, indexMin)

    array[indexMin].color = ElementStates.Default;
    array[i].color = ElementStates.Modified;
    setColumnData([...array]);
  }  
  return array;
};

export const bubbleSort = async (array: IcolumnsData[], direction: string, setColumnData: any) => {
  
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length - i - 1; j += 1) {

      array[j].color = ElementStates.Changing;
      if (array[j + 1]) {array[j + 1].color = ElementStates.Changing;}
      setColumnData([...array]);
      await delay(SHORT_DELAY_IN_MS);

      if ((direction === 'ascending' && (array[j].el > array[j + 1]?.el))) {
        swap(array, j, j + 1);         
      } else if ((direction === 'descending') && (array[j].el < array[j + 1]?.el)) {
        swap(array, j, j + 1);     
      }

      array[j].color = ElementStates.Default;
      if (array[j + 1]) array[j + 1].color = ElementStates.Default;
      setColumnData([...array]);
    }
    array[array.length - i - 1].color = ElementStates.Modified;
    setColumnData([...array]);
  }
  return array;
};