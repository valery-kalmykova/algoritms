import React, { createRef, useState, FormEvent, useEffect } from "react";
import styles from "./fibonacci.module.css"
import {
  SolutionLayout,
  Input,
  Button,
  Circle,
 } from "../ui";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';

export const FibonacciPage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [circlesData, setCirclesData] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const fib = async (n: number) => {  
    let start = 1;
    let temp = 0;
    let value: number;
    setCirclesData([start])
    await fibValues(n)
    async function fibValues(n: number) {
      if (n >= 1) {
        value = start + temp;
        temp = start;
        start = value;        
        await delay(SHORT_DELAY_IN_MS);
        setCirclesData(circlesData => [...circlesData, value])
        n-=1;
      } else return;
      await fibValues(n)
    }
  }

  const start = async (e: FormEvent) => {
    e.preventDefault();  
    setInProgress(true);
    if (inputRef.current) {      
      const value = parseInt(inputRef.current.value);
      await delay(SHORT_DELAY_IN_MS)
      fib(value); 
    }
    setInProgress(false);    
  }

  const checkDisable = () => {
    const value = parseInt(inputRef.current!.value, 10)
      if (value > 19 || inputRef.current!.value === '') {
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
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.inputContainer} onSubmit={start}>
        <Input 
          max={19}
          type='number'
          isLimitText={true}
          ref={inputRef}
          onChange={checkDisable} />
        <Button text="Рассчитать" type='submit' isLoader={inProgress} disabled={isDisabled}
        name='calculate' />          
      </form>            
      <div className={styles.circlesContainer}>        
        {circlesData && circlesData.map((item: number, index: number)=>{
          return (
            <Circle letter={item.toString()} index={index} key={index} />
          )
        })}        
      </div>
    </SolutionLayout>
  );
};
