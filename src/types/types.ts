import { ElementStates } from "./element-states";

interface IcirclesData {
  el: string, 
  color: ElementStates,
};

interface IcolumnsData {
  el: number, 
  color: ElementStates,
};

export type {
  IcirclesData,
  IcolumnsData, 
}