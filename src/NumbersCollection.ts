import { Sorter } from "./Sorter";
export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    //We are running Sorter's constructor
    super();
  }

  get length(): number {
    return this.data.length;
  }
  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex];
    this.data[leftIndex] = this.data[leftIndex];
    this.data[rightIndex] = leftHand;
  }
}
