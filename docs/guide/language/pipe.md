# Pipe Operator

AIScript features a powerful pipe operator (`|>`) that allows for clean, readable function composition. This operator takes the value on its left side and passes it as the first argument to the function on its right side, enabling elegant data transformation pipelines.

## Basic Usage

The pipe operator (`|>`) passes the result of the left expression as the first argument to the function on the right:

```js
let result = "hello world" |> len;
print(result); // 11
```

This is equivalent to:

```js
let result = len("hello world");
print(result); // 11
```

:::tip

`len()` is a builtin function in AIScript, see [Builtin Functions](/std/builtin/functions#len) for more details.
:::

## Chaining Transformations

The real power of the pipe operator is in creating readable processing pipelines:

```js
let data = [1, 2, 3, 4, 5];

let result = data
    |> map(|x| x * 2)         // [2, 4, 6, 8, 10]
    |> filter(|x| x > 5)      // [6, 8, 10]
    |> sum; // 24

print(result); // 24
```

:::tip
You can omit the `()` if the function only has one argument, for example `sum()` in the above example.
:::

Without the pipe operator, this would be written as:

```js
let data = [1, 2, 3, 4, 5];
let mapped = map(data, |x| x * 2);
let filtered = filter(mapped, |x| x > 5);
let result = sum(filtered);
print(result); // 24
```

Or even less readably as nested function calls:

```js
let result = sum(
    filter(
        map(
            [1, 2, 3, 4, 5],
            |x| x * 2
        ),
        |x| x > 5
    )
);
```

:::tip

`map()`, `filter()` and `sum()` are builtin functions in AIScript, see [Builtin Functions](/std/builtin/functions#sum) for more details.
:::

## Working with Additional Arguments

When piping to a function that requires multiple arguments, the piped value becomes the first argument, and you must provide the remaining arguments:

```js
let v = 1;
let add_n = |x, n| x + n;
let mul_n = |x, n| x * n;
// Without pipe
print(
    mul_n(add_n(v, 10), 5)
); // expect: 55

// With pipe
print(
    v 
    |> add_n(10) 
    |> mul_n(5)
); // expect: 55
```

## Creating Custom Pipelines

You can define functions designed specifically for use in pipelines:

```js
fn to_uppercase(text: str) -> str {
    return text.to_uppercase();
}

fn remove_spaces(text: str) -> str {
    return text.replace(" ", "");
}

fn count_chars(text: str) -> int {
    return len(text);
}

let result = "Hello World"
    |> remove_spaces     // "HelloWorld"
    |> to_uppercase      // "HELLOWORLD"
    |> count_chars;      // 10

print(result); // 10
```

## Pipe with Method Calls

You can pipe directly to method calls using a special syntax:

```js
// The standard library's string module
let processed =
  "hello world"
  |> str.trim()
  |> str.to_uppercase()
  |> str.replace("WORLD", "AISCRIPT");

print(processed); // "HELLO AISCRIPT"
```

## Practical Examples

### Data Processing

```js
let users = [
    {name: "Alice", age: 28, active: true},
    {name: "Bob", age: 35, active: false},
    {name: "Charlie", age: 21, active: true},
    {name: "Diana", age: 40, active: true}
];

let result = users
    |> filter(|user| user.active)
    |> map(|user| user.name);

print(", ".join(result)); // "Alice, Charlie, Diana"
```

### Text Analysis

```js
let word_frequencies = "This is a simple example. This example shows the pipe operator."
    |> str.to_lowercase()
    |> str.replace(/[.,!?;:]/g, "")
    |> str.split(" ")
    |> reduce(|acc, word| {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

print(word_frequencies);
// {
//   "this": 2,
//   "is": 1,
//   "a": 1,
//   "simple": 1,
//   "example": 2,
//   "shows": 1,
//   "the": 1,
//   "pipe": 1,
//   "operator": 1
// }
```

## Benefits of the Pipe Operator

1. **Readability**: Processes flow from left to right, matching how we naturally read
2. **Maintainability**: Easy to add, remove, or reorder processing steps
3. **Reduced nesting**: Eliminates deeply nested function calls
4. **Focused functions**: Encourages small, single-purpose functions
5. **Testability**: Pipeline components can be tested in isolation

The pipe operator is particularly valuable when working with data transformation, functional programming patterns, and AI workflow pipelines, making it a core feature of AIScript's expressive syntax.
