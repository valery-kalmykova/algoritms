import React, {createRef, useEffect, useState, useMemo} from "react";
import styles from "./list.module.css"
import {
  SolutionLayout,
  Input,
  Button,
  Circle,
  ArrowIcon,
 } from "../ui";
 import { ElementStates } from "../../types/element-states";
 import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
 import { delay } from '../../utils/utils';
 import { ILinkedList, INode, LinkedList, Node } from './linkedList';

 interface IcirclesData {
  el?: string,
  color?: ElementStates,
  head?: string,
  tail?: string,
  isSmall?: boolean,
  isSmallValue?: string,
  isSmallPosition?: 'top' | 'bottom',
}

export const ListPage: React.FC = () => {
  const inputRef = createRef<HTMLInputElement>();
  const inputIndexRef = createRef<HTMLInputElement>();
  const [circlesData, setCirclesData] = useState<INode<IcirclesData>[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isDisabledAddByIndex, setIsDisabledAddByIndex] = useState<boolean>(false);
  const [isDisabledAdd, setIsDisabledAdd] = useState<boolean>(false);
  const [isDisabledRemove, setIsDisabledRemove] = useState<boolean>(false);
  const [isDisabledRemoveByIndex, setIsDisabledRemoveByIndex] = useState<boolean>(false);

  const linkedList: ILinkedList <IcirclesData> = useMemo(()=> new LinkedList(), [])
  const node1: INode<IcirclesData> = new Node({ value: {el: '0', head: 'head'}, next: null });
  const node2: INode<IcirclesData> = new Node({ value: {el: '34'}, next: null });
  const node3: INode<IcirclesData> = new Node({ value: {el: '8'}, next: null });
  const node4: INode<IcirclesData> = new Node({ value: {el: '1', tail: 'tail'}, next: null });
  
  useEffect(() => {    
    linkedList.addFirst(node4);
    linkedList.addFirst(node3);
    linkedList.addFirst(node2);
    linkedList.addFirst(node1);
    setCirclesData(linkedList.enumerable())      
  }, [])

  const disableAdd = () => {
    if (inputRef.current?.value === '') {
      setIsDisabledAdd(true)
    } else {
      setIsDisabledAdd(false)
    } 
  }

  const disablebyIndex = () => {    
    if (inputRef.current?.value === '' || inputIndexRef.current?.value === '') {
      setIsDisabledAddByIndex(true)
    } else if (parseInt(inputIndexRef.current!.value, 10) > circlesData.length - 1) {
      setIsDisabledAddByIndex(true)
    } else {
      setIsDisabledAddByIndex(false)
    }

    if (inputIndexRef.current?.value === '' ||
        parseInt(inputIndexRef.current!.value, 10) > circlesData.length - 1 ) {
      setIsDisabledRemoveByIndex(true)
    } else {
      setIsDisabledRemoveByIndex(false)
    }
  }

  useEffect(() => {
    disableAdd();
    disablebyIndex();
    if (circlesData.length <= 0) {
      setIsDisabledRemove(true)
    } else {
      setIsDisabledRemove(false)
    }
  }, [inputRef, inputIndexRef, circlesData])

  const addFirstNode = async (newNode: INode<IcirclesData>) => {
    circlesData.unshift(newNode);  
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    circlesData[0].value!.color = ElementStates.Default;
    circlesData[0].value!.head = 'head';
    circlesData[0].value!.tail = 'tail';
    setCirclesData([...circlesData]);
  }
  
  const addFirst = async (ref: HTMLInputElement): Promise<void> => {
    setInProgress(true);
    if (!ref) {
      return;
    }
    const newNode: INode<IcirclesData> = new Node({ value: {el: ref.value, color: ElementStates.Modified}, next: null })    
    if (circlesData.length === 0) {
      addFirstNode(newNode);
    } else {
      if (circlesData[0].value && newNode.value) {
        circlesData[0].value.isSmall = true;
        circlesData[0].value.isSmallValue = newNode.value.el;
        circlesData[0].value.isSmallPosition = 'top';
        circlesData[0].value.head = '';
      }
      setCirclesData([...circlesData]);
      await delay(DELAY_IN_MS);
      if (circlesData[0].value) {
        circlesData[0].value.isSmall = false;      
      }
      circlesData.unshift(newNode);
      setCirclesData([...circlesData]);
      await delay(SHORT_DELAY_IN_MS);    
      if (circlesData && circlesData[0].value) {
        circlesData[0].value.color = ElementStates.Default;
        circlesData[0].value.head = 'head';
      }
    }    
    setCirclesData([...circlesData]);
    ref.value = '';
    setInProgress(false);
    linkedList.addFirst(newNode);
  }

  const addLast = async (ref: HTMLInputElement): Promise<void> => {
    setInProgress(true)  
    if (!ref) {
      return;
    }
    const newNode: INode<IcirclesData> = new Node({ value: {el: ref.value, color: ElementStates.Modified}, next: null })    
    if (circlesData.length === 0) {
      addFirstNode(newNode); 
    } else {
      if (circlesData[circlesData.length - 1].value && newNode.value) {
        circlesData[circlesData.length - 1].value!.isSmall = true;
        circlesData[circlesData.length - 1].value!.isSmallValue = newNode.value.el;
        circlesData[circlesData.length - 1].value!.isSmallPosition = 'top';
        circlesData[circlesData.length - 1].value!.tail = '';
      }
      setCirclesData([...circlesData]);
      await delay(DELAY_IN_MS);
      if (circlesData[circlesData.length - 1].value) {
        circlesData[circlesData.length - 1].value!.isSmall = false;      
      }
      circlesData.push(newNode)
      setCirclesData([...circlesData])
      await delay(SHORT_DELAY_IN_MS);    
      if (circlesData[circlesData.length - 1].value) {
        circlesData[circlesData.length - 1].value!.color = ElementStates.Default;
        circlesData[circlesData.length - 1].value!.tail = 'tail';
      }
    }
    setCirclesData([...circlesData])
    ref.value = '';
    setInProgress(false);
    linkedList.addLast(newNode);
  }

  const removeFirst = async (): Promise<void> => {
    setInProgress(true);    
    if (circlesData[0].value) {
      circlesData[0].value.isSmall = true;
      circlesData[0].value.isSmallValue = circlesData[0].value.el;
      circlesData[0].value.isSmallPosition = 'bottom';
      circlesData[0].value.el = ''  
    }
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    circlesData.shift();
    if (circlesData.length > 0 && circlesData[0].value) {
      circlesData[0].value.head = 'head';
    }
    setCirclesData([...circlesData])
    await delay(DELAY_IN_MS);
    linkedList.removeFirst();
    setInProgress(false); 
  }

  const removeLast = async (): Promise<void> => {
    setInProgress(true);
    if (circlesData[circlesData.length - 1].value) {
      circlesData[circlesData.length - 1].value!.isSmall = true;
      circlesData[circlesData.length - 1].value!.isSmallValue = circlesData[circlesData.length - 1].value!.el;
      circlesData[circlesData.length - 1].value!.isSmallPosition = 'bottom';
      circlesData[circlesData.length - 1].value!.el = '';
    }
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);    
    circlesData.splice(-1,1);
    if (circlesData.length > 0 && circlesData[circlesData.length - 1].value) {
      circlesData[circlesData.length - 1].value!.tail = 'tail';
    }
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    linkedList.removeLast();
    setInProgress(false);
  }

  const add = async (ref: HTMLInputElement, refIndex: HTMLInputElement): Promise<void> => {    
    if (!ref || !refIndex) {
      return;
    }
    setInProgress(true);    
    const index = parseInt(refIndex.value, 10);   
    const newNode: INode<IcirclesData> = new Node({ value: {el: ref.value, color: ElementStates.Modified}, next: null })
    
    for (let i: number = 0; i < index; i++) {      
      circlesData[i].value!.color = ElementStates.Changing;
      circlesData[i + 1].value!.isSmall = true;
      circlesData[i].value!.isSmall = false;
      circlesData[i + 1].value!.isSmallValue = newNode.value!.el;
      circlesData[i + 1].value!.isSmallPosition = 'top';
      setCirclesData([...circlesData]);
      await delay(SHORT_DELAY_IN_MS);
    }
    circlesData[index].value!.isSmall = false;
    circlesData.splice(index, 0, newNode)
    circlesData.map((el) => el.value?.color === ElementStates.Changing ? el.value.color = ElementStates.Default : null)
    if(index === 0) {
      circlesData[index].value!.head = 'head';
      circlesData[index + 1].value!.head = '';
    }
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    circlesData[index].value!.color = ElementStates.Default;
    setCirclesData([...circlesData]);
    linkedList.add(newNode, index); 
    ref.value = '';
    refIndex.value = '';
    setInProgress(false);
  }

  const remove = async (refIndex: HTMLInputElement): Promise<void> => {    
    if (!refIndex) {
      return;
    }
    setInProgress(true);
    const index = parseInt(refIndex.value, 10);
    for (let i: number = 0; i <= index; i++) {
      circlesData[i].value!.color = ElementStates.Changing;
      setCirclesData([...circlesData]);
      await delay(SHORT_DELAY_IN_MS);
    }
    circlesData.map((el) => el.value?.color === ElementStates.Changing ? el.value.color = ElementStates.Default : null)
    circlesData[index].value!.isSmall = true;
    circlesData[index].value!.isSmallValue = circlesData[index].value!.el;
    circlesData[index].value!.isSmallPosition = 'bottom';
    circlesData[index].value!.el = '';
    setCirclesData([...circlesData]);
    await delay(DELAY_IN_MS);
    circlesData.splice(index, 1);
    if (circlesData.length > 0) {
      if(index === 0) circlesData[index].value!.head = 'head';
      if(index === circlesData.length) circlesData[circlesData.length - 1].value!.tail = 'tail';
    }    
    setCirclesData([...circlesData]);
    linkedList.remove(index);
    refIndex.value = '';
    setInProgress(false);             
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputContainer}>
        <Input 
          maxLength={4}
          type='text'
          isLimitText={true}
          ref={inputRef}
          onChange={disableAdd} />
        <Button text="Добавить в head" 
          onClick={()=>{if (inputRef.current) addFirst(inputRef.current)}}
          type='button' isLoader={inProgress} disabled={isDisabledAdd}
          name='add to head' />
        <Button text="Добавить в tail"
          onClick={()=>{if (inputRef.current) addLast(inputRef.current)}}
          type='button' isLoader={inProgress} disabled={isDisabledAdd}
          name='add to tail' />
        <Button text="Удалить из head" onClick={()=>removeFirst()}
          disabled={isDisabledRemove} isLoader={inProgress}
          name='delete from head' />
        <Button text="Удалить из tail" onClick={()=>removeLast()}
          disabled={isDisabledRemove} isLoader={inProgress}
          name='delete from tail' />         
      </div>
      <div className={styles.inputContainer} style={{ marginTop: "12px" }}>
        <Input
          maxLength={4}
          ref={inputIndexRef}
          onChange={disablebyIndex} />
        <Button text="Добавить по индексу"
          onClick={()=>{if (inputRef.current && inputIndexRef.current) add(inputRef.current, inputIndexRef.current)}}
          type='button' disabled={isDisabledAddByIndex} isLoader={inProgress}
          name='add by index' />
        <Button text="Удалить по индексу"
          onClick={()=>{if (inputIndexRef.current) remove(inputIndexRef.current)}}
          type='button' disabled={isDisabledRemoveByIndex} isLoader={inProgress}
          name='delete by index' />                 
      </div>           
      <div className={styles.circlesContainer}>
        {circlesData && circlesData.map((item: INode<IcirclesData>, index: number)=>{
          return (
            <div className={styles.circleArrowContainer} key={index}>
              <div className={styles.circleContainer}>
                <Circle 
                  letter={item.value?.el} 
                  index={index} 
                  tail={item.value?.tail} 
                  head={item.value?.head} 
                  state={item.value?.color} />
                {item.value?.isSmall && 
                  <Circle 
                    letter={item.value?.isSmallValue}
                    isSmall
                    extraClass={item.value?.isSmallPosition === 'top' ? styles.topPosition : styles.bottomPosition}
                    state={ElementStates.Changing} />
                }
              </div>
              <ArrowIcon />
            </div>
          )
        })} 
      </div>
    </SolutionLayout>
  );
};

