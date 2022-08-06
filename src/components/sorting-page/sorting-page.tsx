import React, { useEffect, useState } from "react";
import styles from "./sort.module.css"
import { 
  SolutionLayout,
  RadioInput,
  Button,
  Column,
} from "../ui";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { IcolumnsData } from '../../types/types';
import { selectionSort, bubbleSort } from './utils';

export const SortingPage: React.FC = () => {
  const [checkedSelection, setCheckedSelection] = useState<boolean>(true);
  const [checkedBubble, setCheckedBubble] = useState<boolean>(false);
  const [columnData, setColumnData] = useState<IcolumnsData[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const randomArray = (lengthMin: number, lenghtMax: number, max: number) => {
    const arrLengh = Math.floor(lengthMin + Math.random() * (lenghtMax + 1 - lengthMin))
    const arr = [...Array(arrLengh)].map(() => Math.round(Math.random() * max));
    const arrColumns = arr.map((el) => ({el, color: ElementStates.Default}))
    setColumnData(arrColumns)   
  }

  useEffect(() => {
    randomArray(3, 17, 40)  
  }, [])
  
  const sort = async (arr: IcolumnsData[], direction: string) => {
    setInProgress(true);
    setIsDisabled(true);
    if (checkedSelection) {
      await selectionSort(arr, direction, setColumnData)
    }
    if (checkedBubble) {
      await bubbleSort(arr, direction, setColumnData)
    }
    setInProgress(false);
    setIsDisabled(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputContainer}>
        <RadioInput 
          extraClass={styles.radioinput} 
          label="Выбор" 
          checked={checkedSelection}
          onChange={(e) => {
            setCheckedSelection(prevCheck => !prevCheck)
            setCheckedBubble(prevCheck => !prevCheck)
            }}
           />
        <RadioInput 
          extraClass={styles.radioinput} 
          label="Пузырёк" 
          checked={checkedBubble}
          onChange={(e) => {
            setCheckedBubble(prevCheck => !prevCheck)
            setCheckedSelection(prevCheck => !prevCheck)
            }} />
        <Button 
          sorting={Direction.Ascending} 
          text="По возрастанию" 
          onClick={()=>{sort(columnData, 'ascending')}}
          isLoader={inProgress} disabled={isDisabled} />
        <Button 
          sorting={Direction.Descending} 
          text="По убыванию" 
          onClick={()=>{sort(columnData, 'descending')}}
          isLoader={inProgress} disabled={isDisabled} />
        <Button text="Новый массив" onClick={()=>{randomArray(3, 17, 40)}}/>
      </div>
      <div className={styles.columnsContainer}>
        {columnData && columnData.map((item: IcolumnsData, index: number)=>{
          return (
            <Column index={item.el} state={item.color} key={index} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
