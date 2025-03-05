# Class and Object

AIScript offers a powerful class-based object-oriented programming model inspired by Rust and JavaScript. Classes provide a clean way to encapsulate data and behavior while offering intuitive syntax for inheritance and method definition.

## Defining a Class

Use the `class` keyword to define a class with properties and methods:

```js
class Person {
    name: str,
    age: int,
    
    fn new(name: str, age: int) {
        self.name = name;
        self.age = age;
    }
    
    fn greet() -> str {
        return "Hello, my name is {self.name} and I'm {self.age} years old.";
    }
}
```

The `new` method is a special constructor that initializes a new instance of the class.

## Creating Objects

Create a new instance of a class using the class name followed by parentheses containing constructor arguments:

```js
let alice = Person("Alice", 30);
print(alice.greet()); // "Hello, my name is Alice and I'm 30 years old."
```

You can also use object literal syntax with type checking:

```js
let bob = Person {
    name: "Bob",
    age: 25,
};

print(bob.greet()); // "Hello, my name is Bob and I'm 25 years old."
```

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
    
    @string(pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    email: str,
    
    @number(min=0, max=120)
    age: int,
}

// This will throw a validation error
let invalid_user = User {
    username: "a",
    email: "not-an-email",
    age: 150,
} |err| {
    print("Validation error:", err);
};
```

## Inheritance

Use the parentheses syntax to inherit from another class:

```js
class Employee(Person) {
    @string
    job_title: str,
    
    fn new(name: str, age: int, job_title: str) {
        // Call the parent class constructor
        super.new(name, age);
        self.job_title = job_title;
    }
    
    fn greet() -> str {
        return "Hello, I'm {self.name}, a {self.job_title}.";
    }
}

let developer = Employee("Carlos", 28, "Software Developer");
print(developer.greet()); // "Hello, I'm Carlos, a Software Developer."
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
    
    fn get_url() -> str {
        return "http://{self.host}:{self.port}";
    }
}

// Use defaults
let default_config = Config();
print(default_config.get_url()); // "http://localhost:8080"

// Override defaults
let custom_config = Config {
    host: "example.com",
    port: 443,
};
print(custom_config.get_url()); // "http://example.com:443"
```

## Error Handling in Methods

Methods can declare and handle errors using the same error handling syntax as regular functions:

```js
enum NetworkError! {
    ConnectionFailed,
    Timeout,
    ServerError(str),
}

class APIClient {
    base_url: str,
    
    fn new(base_url: str) {
        self.base_url = base_url;
    }
    
    fn fetch(endpoint: str) -> str | NetworkError! {
        if self.base_url == "" {
            raise NetworkError!::ServerError("Base URL is not set");
        }
        
        // Simulate network request
        if endpoint == "/error" {
            raise NetworkError!::ConnectionFailed;
        }
        
        return "Response from {self.base_url}{endpoint}";
    }
}

let client = APIClient("https://api.example.com");

let result = client.fetch("/users") |err| {
    print("Error fetching data:", err);
    return "Failed to fetch";
};

print(result); // "Response from https://api.example.com/users"
```

This overview covers the fundamentals of class and object-oriented programming in AIScript. By combining these features with AIScript's error handling, validation, and type system, you can create clean, maintainable, and robust code.