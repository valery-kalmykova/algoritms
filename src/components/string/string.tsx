import React, { createRef, useState, FormEvent, useEffect } from "react";
import styles from "./string.module.css"
import {
  SolutionLayout,
  Input,
  Button,
  Circle,
 } from "../ui";
import { ElementStates } from "../../types/element-states";
import { IcirclesData } from '../../types/types';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { compare } from './utils'

export const StringComponent: React.FC = () => {  
  const inputRef = createRef<HTMLInputElement>();
  const [circlesData, setCirclesData] = useState<IcirclesData[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const start = async (e: FormEvent) => {
    e.preventDefault();
    setInProgress(true);
    if (inputRef.current) {
      const strToArr = Array.from(inputRef.current.value);         
      const arr = strToArr.map(el => {
        const obj = {}
        return {...obj, el, color: ElementStates.Default}
      }) ;     
      setCirclesData(arr);
      await delay(DELAY_IN_MS);
      await compare(arr, setCirclesData);
      setInProgress(false);
    }       
  }

  const checkDisable = () => {
    const length = inputRef.current!.value.length
      if (length > 11 || length === 0) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
  }

  useEffect(() => {
    if (inputRef.current!.value === '') {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [])

    
  return (
    <SolutionLayout title="Строка">     
      <form className={styles.inputContainer} onSubmit={start}>
        <Input 
          maxLength={11}
          type='text'
          isLimitText={true}
          ref={inputRef}
          onChange={checkDisable} />
        <Button text="Развернуть" type='submit' isLoader={inProgress} disabled={isDisabled} name='add' />
      </form>            
      <div className={styles.circlesContainer}>
        {circlesData && circlesData.map((item: IcirclesData, index: number)=>{
          return (
            <Circle letter={item.el} state={item.color} key={index} />
          )
        })}               
      </div>
    </SolutionLayout>
  )   
};
