import React, {createRef, useState, FormEvent, useMemo} from "react";
import styles from "./stack.module.css"
import {
  SolutionLayout,
  Input,
  Button,
  Circle,
 } from "../ui";
 import { ElementStates } from "../../types/element-states";
 import { DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { Stack } from './stackClass'
 
 interface IcirclesData {
  el: string,
  color: ElementStates,
  head?: string,
}

export const StackPage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [circlesData, setCirclesData] = useState<IcirclesData[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const stack = useMemo(() => new Stack<IcirclesData>(),[]);

  const addEl = async (ref: HTMLInputElement, e: FormEvent) => {
    e.preventDefault();
    setInProgress(true);
    setIsDisabled(true);
    if (ref) {      
      let item = {
        el: ref.value,
        color: ElementStates.Changing,
        head: 'head'        
      }
      stack.push(item);
      if(circlesData.length) circlesData[circlesData.length-1].head = '';
      circlesData.push(stack.peek())
      setCirclesData([...circlesData]);      
      await delay(DELAY_IN_MS);     
      circlesData[circlesData.length-1].color = ElementStates.Default;    
      setCirclesData([...circlesData])      
      ref.value = '';
    }
    setInProgress(false);
    setIsDisabled(false);
  }

  const removeEl = async () => {
    setInProgress(true);
    setIsDisabled(true);
    circlesData[circlesData.length-1].color = ElementStates.Changing;
    setCirclesData([...circlesData])
    await delay(DELAY_IN_MS)
    circlesData.pop();
    stack.pop();
    if(circlesData.length) circlesData[circlesData.length-1].head = 'head';
    setCirclesData([...circlesData])   
    setInProgress(false);
    setIsDisabled(false);
  }

  const clear = () => {
    stack.reset();
    setCirclesData([])
  } 

  return (
    <SolutionLayout title="Стек">
      <form className={styles.inputContainer} onSubmit={(e)=>{if (inputRef.current) addEl(inputRef.current, e)}}>
        <Input 
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef} />
        <Button text="Добавить" type='submit' isLoader={inProgress} disabled={isDisabled} />
        <Button text="Удалить" type='button' onClick={()=>{removeEl()}} isLoader={inProgress} disabled={isDisabled} />
        <Button text="Очистить" type='reset' onClick={()=>{clear()}} isLoader={inProgress} disabled={isDisabled} />
      </form>
      <div className={styles.circlesContainer}>
        {circlesData && circlesData.map((item: IcirclesData, index: number)=>{
          return (
            <Circle 
              letter={item.el} 
              state={item.color} 
              key={index} 
              index={index}              
              head={item.head} />
          )
        })}       
      </div>
    </SolutionLayout>
  );
};
