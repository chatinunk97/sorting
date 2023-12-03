import { NumbersCollection } from "./NumbersCollection";
import { CharacterCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

const numberCollection = new NumbersCollection([4, 2, 1, 0]);
numberCollection.sort();
console.log(numberCollection.data);
const characterCollection = new CharacterCollection("aopsdkalzxd");
characterCollection.sort();
console.log(characterCollection.data);

const ll = new LinkedList();
ll.add(100);
ll.add(200);
ll.add(500);
ll.add(-100);
ll.sort();
ll.print();
