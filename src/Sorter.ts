import { NumbersCollection } from "./NumbersCollection";
export class Sorter {
  //   collection: number[];
  //Again we can use type modifier to shorten the code
  // a type modifier tells ts to auto generate the variable already

  // Remember the Union types | isn't really like OR
  // IT will only take the 'shared' property
  constructor(public collection: NumbersCollection /*TODO FIXME add a type*/) {
    this.collection = collection;
  }

  sort(): void {
    const { length } = this.collection;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1);
        }
      }
    }
  }
}
