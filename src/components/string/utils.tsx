import React from "react";
import { ElementStates } from "../../types/element-states";
import { IcirclesData } from '../../types/types';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay, swap } from '../../utils/utils';

export const compare = async (a: IcirclesData[], setCirclesData: any) => {    
  let start = 0;
  let end = a.length-1;  
  while (start <= end) {
    a[start].color = ElementStates.Changing;
    a[end].color = ElementStates.Changing;
    setCirclesData([...a]);
    await delay(DELAY_IN_MS);
    swap(a, start, end);
    a[start].color = ElementStates.Modified;
    a[end].color = ElementStates.Modified;
    setCirclesData([...a]);          
    await delay(DELAY_IN_MS);
    start++;
    end--;
  }
  return a; 
}