import React, {createRef, useState, FormEvent, useMemo, useEffect} from "react";
import styles from "./queue.module.css"
import {
  SolutionLayout,
  Input,
  Button,
  Circle,
 } from "../ui";
 import { ElementStates } from "../../types/element-states";
 import { Queue } from './queueClass';
 import { DELAY_IN_MS } from '../../constants/delays';
 import { delay } from '../../utils/utils';

interface IcirclesData {
  el?: string,
  color?: ElementStates,
  head?: string,
  tail?: string,
  index: number,
}

const initialState = [
  {index: 0},
  {index: 1},
  {index: 2},
  {index: 3},
  {index: 4},
  {index: 5},
  {index: 6},
]

export const QueuePage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [circlesData, setCirclesData] = useState<IcirclesData[]>(initialState);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isDisabledAdd, setIsDisabledAdd] = useState<boolean>(false);
  const capacityQueue = 7;

  const queue = useMemo(() => new Queue<IcirclesData>(capacityQueue), [])

  const addEl = async (ref: HTMLInputElement, e: FormEvent) => {
    e.preventDefault();
    setInProgress(true);
    setIsDisabled(true);
    if(ref) {
      let item: IcirclesData = {
        el: ref.value,
        color: ElementStates.Changing,
        index: queue.size(),        
        tail: 'tail',
      }
      if(queue.size() === 0) item.head = 'head';
      if(queue.size() >= 1) {
        queue.last().tail = '';
      }
      queue.enqueue(item);    
    }
    circlesData[queue.size() - 1] = queue.last();
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    circlesData[queue.size() - 1].color = ElementStates.Default;    
    setCirclesData([...circlesData])      
    ref.value = '';  
    setInProgress(false);
    setIsDisabled(false);    
  }

  const removeEl = async () => {
    setInProgress(true);
    setIsDisabled(true);
    circlesData.map(el => el.head === 'head' ? el.color = ElementStates.Changing : null)    
    setCirclesData([...circlesData])
    await delay(DELAY_IN_MS)
    circlesData.map((el) => {if(el.head === 'head') {            
      el.el = '';
      el.head = '';
      el.color = ElementStates.Default;
      if (queue.size() === 1) el.tail = '';
    } return null })    
    queue.dequeue();
    const newFirst: IcirclesData | undefined = circlesData.find(el => el.el);
    if (newFirst) newFirst.head = 'head'
    setCirclesData([...circlesData])
    await delay(DELAY_IN_MS);  
    setInProgress(false);
    setIsDisabled(false);
  }

  const clear = () => {
    queue.reset();
    setCirclesData(initialState)
  }

  const disableAdd = () => {
    if (inputRef.current?.value === '') {
      setIsDisabledAdd(true)
    } else {
      setIsDisabledAdd(false)
    } 
  }

  useEffect(() => {
    disableAdd() 
  }, [inputRef])
 
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.inputContainer} onSubmit={(e)=>{if (inputRef.current) addEl(inputRef.current, e)}}>
        <Input 
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef}
          onChange={disableAdd} />
        <Button text="Добавить" type='submit' isLoader={inProgress} disabled={isDisabledAdd}/>
        <Button text="Удалить" type='button' onClick={() => {removeEl()}} isLoader={inProgress} disabled={isDisabled}/>
        <Button text="Очистить" type='reset' onClick={()=>{clear()}} />          
      </form>            
      <div className={styles.circlesContainer}>
        {circlesData && circlesData.map((item: IcirclesData, index: number)=>{
          return (
            <Circle 
              letter={item.el} 
              state={item.color} 
              key={index} 
              index={index}              
              head={item.head}
              tail={item.tail} />
          )
        })}               
      </div>
    </SolutionLayout>
  );
};
