import React, {createRef, useState, FormEvent, useMemo, useEffect} from "react";
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
  const [isDisabledAdd, setIsDisabledAdd] = useState<boolean>(false);
  const [isDisabledRemove, setIsDisabledRemove] = useState<boolean>(false);

  const stack = useMemo(() => new Stack<IcirclesData>(),[]);

  const addEl = async (ref: HTMLInputElement, e: FormEvent) => {
    e.preventDefault();
    setInProgress(true);
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
  }

  const removeEl = async () => {
    setInProgress(true);
    circlesData[circlesData.length-1].color = ElementStates.Changing;
    setCirclesData([...circlesData])
    await delay(DELAY_IN_MS)
    circlesData.pop();
    stack.pop();
    if(circlesData.length) circlesData[circlesData.length-1].head = 'head';
    setCirclesData([...circlesData])   
    setInProgress(false);
  }

  const clear = () => {
    stack.reset();
    setCirclesData([])
  } 

  const checkDisable = () => {
    const length = inputRef.current!.value.length;
      if (length > 4 || length === 0) {
        setIsDisabledAdd(true)
      } else {
        setIsDisabledAdd(false)
      }
  }

  useEffect(() => {
    if (inputRef.current!.value === '') {
      setIsDisabledAdd(true);
      setIsDisabledRemove(true)
    } else {
      setIsDisabledAdd(false);
      setIsDisabledRemove(false)
    }
    if (circlesData.length <= 0) {
      setIsDisabledRemove(true);
    } else {
      setIsDisabledRemove(false)
    }
  }, [inputRef, circlesData])

  return (
    <SolutionLayout title="Стек">
      <form className={styles.inputContainer} onSubmit={(e)=>{if (inputRef.current) addEl(inputRef.current, e)}}>
        <Input 
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef}
          onChange={checkDisable} />
        <Button text="Добавить" type='submit' name='add'
          isLoader={inProgress} disabled={isDisabledAdd} />
        <Button text="Удалить" type='button' name='delete'
          onClick={()=>{removeEl()}} isLoader={inProgress} disabled={isDisabledRemove} />
        <Button text="Очистить" type='reset' name='clear'
          onClick={()=>{clear()}} isLoader={inProgress} disabled={isDisabledRemove} />
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
