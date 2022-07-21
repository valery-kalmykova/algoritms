type IError = {
  message: string;
};

export type INode <T> = {
  value: T | null;
  next: INode <T> | null;
  previous?: INode <T> | null
};

export type ILinkedList <T> = {
  head: INode <T> | null;
  tail: INode <T> | null;
  length: number;
  add: (node: INode <T>, index: number) => void | IError;
  addFirst: (node: INode <T>) => void;
  addLast: (node: INode <T>) => void;
  remove: (index: number) => INode <T> | IError;
  removeFirst: () => INode <T> | IError;
  removeLast: () => INode <T> | IError;
  find: (value: T) => number | undefined;
  enumerable: () => INode <T> [];
  reset: () => void;
};

export class Node <T> {
  value: T | null = null;
  next: INode <T> | null = null;
  previous: INode <T> | null | undefined = undefined;

  constructor ({ value, next, previous }: INode <T>) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};

export class LinkedList <T> {
  head: INode <T> | null = null;
  tail: INode <T> | null = null;
  length: number = 0;


  add (node: INode <T>, index: number) : void | IError {
    if (index > this.length || index < 0) {
      return { message: 'Out of range error' };
    }

    if (index === 0) {
      this.addFirst(node);
      return;
    }

    if (index === this.length) {
      this.addLast(node);
      return;
    }

    if (this.head !== null) {
      let idx: number = 1;
      let current = this.head;
      let previous: INode <T>;

      while (current.next !== null) {
        previous = current;
        current = current.next;
        if (idx === index) {
          previous.next = node;
          node.next = current;
          this.length = this.length + 1;
          return;
        }

        idx = idx + 1;
      }
    }
  }

  addFirst (node: INode <T>) : void {
    if (this.length === 0 || this.head === null) {
      this.head = node;
      this.tail = node;
      this.length = 1;
      return;
    }

    const currentFirst = this.head;
    node.next = currentFirst;
    this.head = node;
    this.length = this.length + 1;
  }

  addLast (node: INode <T>) : void {
    if (this.length === 0 || this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
      this.length = 1;
      return;
    }

    const currentLast = this.tail;
    currentLast.next = node;
    this.tail = node;
    this.length = this.length + 1;
  }

  remove (index: number) : INode <T> | IError {
    if (index > this.length || index < 0 || this.head === null || this.tail === null) {
      return { message: 'Out of range error' };
    }

    if (index === 0) {
      return this.removeFirst();
    }

    if (index === this.length - 1) {
      return this.removeLast();
    }

    let idx: number = 1;
    let previous = null;
    let current = this.head;

    while (current.next !== null) {
      previous = current;
      current = current.next;
      if (idx === index) {
        previous.next = current.next;
        this.length = this.length - 1;
        return current;
      }

      idx = idx + 1;
    }

    return current;
  }

  removeFirst () : INode <T> | IError {
    if (this.length === 0 || this.head === null) {
      return { message: 'Invalid operation. Length of the linked list is 0' };
    }

    const removedNode: INode <T> = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removedNode;
    }

    this.head = removedNode.next;
    this.length = this.length - 1;
    return removedNode
  }

  removeLast () : INode <T> | IError {
    if (this.length === 0 || this.head === null || this.tail === null) {
      return { message: 'Invalid operation. Length of the linked list is 0' };
    }

    const removedNode: INode <T> = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removedNode;
    }

    let previous: INode <T>;
    let current = this.head;

    while (current.next !== null) {
      previous = current;
      current = current.next;

      if (current.next === null) {
        previous.next = null;
        this.tail = previous;
        this.length = this.length - 1;
      }
    }

    return removedNode;
  }

  find (value: T) : number | undefined {
    if (this.length === 0 || this.head === null) {
      return undefined;
    }

    const index = this.enumerable().findIndex((node) => node.value === value);
    if (index < 0) {
      return undefined;
    }

    return index;
  }

  reset () : void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enumerable () : INode<T> [] {
    let current = this.head;
    let nodeChain: INode<T>[] = [];

    if (!current) {
      return nodeChain;
    }

    while(current !== null) {
      nodeChain.push(current);
      current = current.next;
    }

    return nodeChain;
  }
}