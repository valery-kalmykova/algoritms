import React from "react";
import { IcirclesData, IcolumnsData } from '../types/types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const swap = (array: IcirclesData[] | IcolumnsData[], firstIndex: number, lastIndex: number) => {    
  const tmp = array[firstIndex];
  array[firstIndex] = array[lastIndex];
  array[lastIndex] = tmp;
}

export {
  delay,
  swap,
}