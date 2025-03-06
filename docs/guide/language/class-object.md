# Class and Object

AIScript offers a powerful class-based object-oriented programming model inspired by Rust and JavaScript. Classes provide a clean way to encapsulate data and behavior while offering intuitive syntax for inheritance and method definition.

## Defining a Class

Use the `class` keyword to define a class with properties and methods.

```rust
class Person {
    name: str,
    age: int,

    fn new(name: str, age: int) {
        self.name = name;
        self.age = age;
    }
}
```

The `new()` method is a special constructor that initializes a new instance of the class.

## Creating Objects

Create a new instance of a class using the class name followed by parentheses containing constructor arguments:

```js
let alice = Person("Alice", 30);
print(alice); // Person {name: Alice, age: 30}
```

You can also use object literal syntax with type checking:

```js
let bob = Person {
    name: "Bob",
    age: 25,
};

print(bob); // Person {name: Bob, age: 25}
```

## Methods

Define methods within a class using the `fn` keyword, declare `self` as the first argument to make the method a instance method, otherwise, it's a static method:

```js
class Person {
    name: str,
    age: int,

    fn new(name: str, age: int) {
        self.name = name;
        self.age = age;
    }

    fn greet(self) -> str {
        print("Hello, my name is", self.name, "and I'm", self.age, "years old.");
    }

    fn static_method() {
        print("static method of Person");
    }
}

let alice = Person("Alice", 30);
alice.greet(); // "Hello, my name is Alice and I'm 30 years old."
Person.static_method(); // "static method of Person"
```
Use `class_instance.method()` to call an instance method, use `ClassName.method()` to call a static method.

## Accessing Properties and Methods

Access object properties and methods using the dot notation:

```js
print(alice.name); // "Alice"
alice.age = 31;
print(alice.age); // 31
print(alice.greet()); // "Hello, my name is Alice and I'm 31 years old."
```

## Field Validation

AIScript supports field validation using directive annotations similar to Python's [Pydantic](https://docs.pydantic.dev/latest/):

```js
class User {
    @string(min_len=3, max_len=50)
    username: str,

    @number(min=0, max=120)
    age: int,
}

// This will throw a validation error
let invalid_user = User {
    username: "a",
    age: 150,
} |err| {
    print(err);
};
```

Above code will throw a validation error:

```json
ValidationError! {
    errors: [
        {
            msg: Number is greater than the maximum value of 120, 
            loc: [age], 
            type: validation_error, 
            input: 150
        }, 
        {
            msg: String length is less than the minimum length of 3, 
            loc: [username], 
            type: validation_error, 
            input: a
        }
    ]
}
```

## Inheritance

Use the parentheses syntax to inherit from another class:

```js
class Employee(Person) {
    job_title: str,

    fn new(name: str, age: int, job_title: str) {
        // Call the parent class constructor
        super.new(name, age);
        self.job_title = job_title;
    }

    fn greet(self) -> str {
        print("Hello, my name is", self.name,"and I'm", self.age, "years old, a", self.job_title);
    }
}

let developer = Employee("Carlos", 28, "Software Developer");
developer.greet(); // "Hello, my name is Carlos and I'm 28 years old, a Software Developer"
```

:::danger
AIScript only support inherit single super class.
:::

## Default Values

You can provide default values for class properties:

```js
class Config {
    host: str = "localhost",
    port: int = 8080,
    debug: bool = false,
}

// Use defaults
let default_config = Config();
print(default_config); // Config {host: localhost, debug: false, port: 8080}

// Override defaults
let custom_config = Config {
    host: "example.com",
    port: 443,
};
print(custom_config); // Config {host: example.com, debug: false, port: 443}
```

This overview covers the fundamentals of class and object-oriented programming in AIScript. By combining these features with AIScript's error handling, validation, and type system, you can create clean, maintainable, and robust code.
