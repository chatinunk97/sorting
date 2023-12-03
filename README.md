# Working with TS using tsc

build folder => a place where we contain our compiled code (JS)

```
tsc --init
```

Create a config file for ts compiler
we need to tell TS compiler that our ts is in SRC and we want the out put to be it build

```
"outDir": "./build",
"rootDir": "./src"
```

Now we can run only tsc
we have it compile auto using below

```
tsc -w
```

it will automatically compile the whole thing again

# getter

```
  get length(): number {
    return this.data.length;
  }
```

This will enable us to use class.length without having to call it
the length will be treated as a property. This is thanks to get

# Nodemon + tsc -w

Now we will use Nodemon with tsc -w
so it will compile when there's any change and also run the code
also we have to use concurrently to able it to run multiple code at the same time

package.json

```
  "scripts": {
    "start:build" : "tsc -w",
    "start:run" : "nodemon build/index.js",
    "start" : "concurrently npm:start:*"
  },
```

the start will look for every script begining with 'start' and run them parrarelly

# Union Types

It's not really like OR operator completely

```
  constructor(public collection: number[] | string) {
    this.collection = collection;
  }
```

In this class we can only use ONLY the property / method that are shared
between number[] and string ONLY
It's not it can be number[] or string

# Type guard

```
this.collection instanceof Array
```

this will guard and make your that in this if statement
the value is an Array so it will resotre the method / property

```
typeof this.collection === "string"
```

The difference between these 2 ways of type guard

typeof => to definie a primitive value like _number string boolean_
This will store access to te according value
\*This may work with typeof this.collection === 'object'
BUT it will not function as a type gaurd meaning it will not restore the property / method

instanceof => check whether it meets a Constructor
like Date, Array, YourOwnClass

# Bad Code

This proejct bad way of handling multiple data type to get sorted is
adding Union type to the constructor
This will end up in a scaling problem when you want to sort many data types
the list will go on forever

# The concept of refactor

![alt text](https://github.com/chatinunk97/sorting/blob/main/screenshot/sort.png?raw=true)

1. We are planning to implement Sorter for every type of data
   so that's the hard part comparing number[] , string , string[] are not the same
2. So we create a seperated Class to handle the Comparing and swaping

- For numbers if we can use > or <
- For strings / string[] we have to use another way
  These class will handle how the input to the Sorter class will be compare and how will it be swapped

3. Now the Sorter is kind of a place holder for different classes to come in and plugin their logic of how to compare and how to swap
   Doing so will enable us to plugin as many data types we have and it will still work ; If the logic is right of course

4. Now we have to have an Interface to make it more general
   So what will we need a class to be to be able to sort ?

- It must have a way to swap each value
- It must have a way to compare 2 elements
- It must be able to give an length

```
interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}
```

The power of interface is you can just add length compare swap
and that's it you can implement your new data type to the sort function
This is the key, you don't have to redefine how the sort is done or write again, this makes interface so handy
In other word you are joining classes to 1 interface

# Last Refactor

Now we have Sorter working taking in string , string[],number[],LinkedList
But we still have to create new Sorter() and pass in an argument
Wouldn't it be bettwer if we can just like
numberCollection.sort()

This is where class extends comes in we can put the sort method in to every class

Now we can use the sort to call compare and swap inside that class directly

1. Frist we will remove the this.collection
   since the collection is the class (numberCollection) itself , the class Sorter does not need that

```
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
```

But TS will throw us an error since in Sorter class they cannot find a method name compare , swap

This is the explanation, TS only see the scope in the class
on the left but the reality is when the NumberCollection class is created there are swap and compare method in there
![alt text](https://github.com/chatinunk97/sorting/blob/main/screenshot/ts_error.png?raw=true)

This brings us to a new word

# Absctract Class

Summary : A parent class that cannot be used to created a new instance
it can have a method / property that isn't implemented yet
But the children that extend this class MUST promise to have those method / property

This make it easier to reuse codes
![alt text](https://github.com/chatinunk97/sorting/blob/main/screenshot/abstractclasses.png?raw=true)

```
export abstract class Sorter {

  //abstract = telling TS that It will come in the future
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  //Rembmer getting is considered as a propety
  abstract length : number;

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
```

One point for the super() thing when using extends class

```
export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    //We are running Sorter's constructor
    super();
  }
}
```

the super is just in there to be sure if the parent class has an constructor we must call it to. Eventho for this Sorter class we don't have a constructor. TS just want us to call it that's all
But if the child class doesnot have a constructor => no need to super()

# Interface vs Abstract Class

Interfaces => coupling object with the similar definitions
but it's more loose

Inheritance / Abstract classes => It's more about inheritance
make it more strict to couple objects together
Class will be useless / cannot exist if we remove this

But thinking from a code reuse we think about interfaces first
