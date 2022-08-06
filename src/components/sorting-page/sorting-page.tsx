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
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, swap } from '../../utils/utils';

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

  const selectionSort = async (array: IcolumnsData[], direction: string) => {
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
  };

  const bubbleSort = async (array: IcolumnsData[], direction: string) => {
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
  };
 
  const sort = async (arr: IcolumnsData[], direction: string) => {
    setInProgress(true);
    setIsDisabled(true);
    if (checkedSelection) {
      await selectionSort(arr, direction)
    }
    if (checkedBubble) {
      await bubbleSort(arr, direction)
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
