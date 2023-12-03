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

1. We are planning to implement Sorter for every type of data
   so that's the hard part comparing number[] , string , string[] are not the same
2. So we create a seperated Class to handle the Comparing and swaping

- For numbers if we can use > or <
- For strings / string[] we have to use another way
  These class will handle how the input to the Sorter class will be compare and how will it be swapped

3. Now the Sorter is kind of a place holder for different classes to come in and plugin their logic of how to compare and how to swap
   Doing so will enable us to plugin as many data types we have and it will still work ; If the logic is right of course
