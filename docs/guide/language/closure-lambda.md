# Closures and Lambdas

AIScript treats functions as first-class citizens, enabling powerful functional programming patterns through closures and lambdas. These constructs allow you to write more concise, flexible, and expressive code.

## Understanding Closures

A closure is a function that captures and remembers the environment in which it was created. This means it can access variables from its enclosing scope, even after that scope has completed execution.

```js
fn create_counter(start: int) {
    let count = start;
    
    fn increment() -> int {
        count += 1;
        return count;
    }
    
    return increment;
}

let counter = create_counter(10);
print(counter()); // 11
print(counter()); // 12
print(counter()); // 13
```

In this example, the `increment` function forms a closure by capturing the `count` variable from its outer scope. Each time `counter` is called, it remembers and updates the same `count` variable.

## Creating Lambdas

Lambdas (also called anonymous functions) are concise function expressions that you can define inline without naming. AIScript provides a simple syntax for lambdas using the pipe `|` character:

```js
// Basic lambda syntax
let add = |a, b| { return a + b; };
print(add(5, 3)); // 8

// For single expressions, you can omit the braces and return statement
let multiply = |a, b| a * b;
print(multiply(4, 6)); // 24
```

## Higher-Order Functions

Closures and lambdas shine when used with higher-order functions (functions that take other functions as arguments or return them):

```js
// Map example
let numbers = [1, 2, 3, 4, 5];
let squared = map(numbers, |n| n * n);
print(squared); // [1, 4, 9, 16, 25]

// Filter example
let even_numbers = filter(numbers, |n| n % 2 == 0);
print(even_numbers); // [2, 4]
```

## Capturing Variables

Closures can capture variables in three different ways:

### 1. By Reference (Default)

```js
let x = 10;
let add_x = |n| n + x;
print(add_x(5)); // 15

x = 20;
print(add_x(5)); // 25 (reflects updated value of x)
```

### 2. Mutable Capture

When a closure modifies a captured variable, it affects the original:

```js
let counter = 0;
let increment = || { counter += 1; return counter; };

print(increment()); // 1
print(increment()); // 2
print(counter);     // 2 (affected by the closure)
```

<!-- ### 3. Multiple Captures

Closures can capture multiple variables from different scopes:

```js
fn create_math_functions(base: int) -> object {
    let factor = 2;
    
    return {
        add: |n| n + base,
        multiply: |n| n * factor,
        combined: |n| (n + base) * factor
    };
}

let math = create_math_functions(10);
print(math.add(5));      // 15
print(math.multiply(5)); // 10
print(math.combined(5)); // 30
``` -->

<!-- ## Partial Application

Use closures to create partially applied functions:

```js
fn partial(func, ...fixed_args) -> fn {
    return |...args| func(...fixed_args, ...args);
}

fn greet(greeting, name) -> str {
    return "{greeting}, {name}!";
}

let hello = partial(greet, "Hello");
let goodbye = partial(greet, "Goodbye");

print(hello("Alice"));  // "Hello, Alice!"
print(goodbye("Bob"));  // "Goodbye, Bob!"
``` -->

## Immediate Invocation

You can immediately invoke a lambda after defining it:

```js
let result = |x, y| {
    let sum = x + y;
    let product = x * y;
    return sum + product;
}(3, 4);

print(result); // 19 (sum: 7, product: 12)
```

## Recursion with Closures

Closures can call themselves recursively:

```js
// Using a named function for recursion
let factorial = |n| {
    fn fact(x) -> int {
        if x <= 1 {
            return 1;
        }
        return x * fact(x - 1);
    }
    
    return fact(n);
};

print(factorial(5)); // 120
```

## Closures as Callbacks

Closures are ideal for event-driven or asynchronous programming:

```js
fn fetch_data(url: str, on_success, on_error) {
    // Simulating an async operation
    if url.starts_with("https") {
        on_success("Data from {url}");
    } else {
        on_error("Invalid URL: {url}");
    }
}

fetch_data(
    "https://api.example.com",
    |data| print("Success:", data),
    |error| print("Error:", error)
);
```

:::danger
AIScript current doesn't support `fn` as type annotation.
```rs
fn fetch_data(url: str, on_success: fn(data: str), on_error: fn(error: str)) {}
```
:::

## Performance Considerations

While closures provide powerful abstractions, they have memory implications since they maintain references to their captured environment. Consider these best practices:

1. **Limit capture scope**: Only capture what you need
2. **Be mindful of memory**: Large closures with many captures may impact performance
3. **Consider alternatives**: For simple cases, regular functions might be more efficient

Closures and lambdas are fundamental to many modern programming patterns, from functional programming to asynchronous workflows. By mastering these concepts in AIScript, you'll be able to write more concise, maintainable, and powerful code.