interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}
export class Sorter {
  //   collection: number[];
  //Again we can use type modifier to shorten the code
  // a type modifier tells ts to auto generate the variable already

  // Remember the Union types | isn't really like OR
  // IT will only take the 'shared' property

  //   constructor(public collection: Sortable /*TODO FIXME add a type*/) {
  //     this.collection = collection;
  //   }

  sort(): void {
    const { length } = this;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
