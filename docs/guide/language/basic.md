# Language Syntax

## Comments

AIScript use `//` as the comment symbol.

```js
// This is a comment

// A hello API endpoint
get /hello {
    query {
        // The name of the person to say hello to
        name: str
    }

    return "Hello, {name}!";
}
```

Every comment on route will be generated to the OpenAPI documentation.

## Variables

```js
let name = "AIScript";
let age = 18;
```

## Constants

Constants are declared with the `const` keyword, and they are immutable. Constants can only be declared once and must be initialized with a value, they cannot be reassigned.

```js
const PI = 3.14;
```

```js
get /hello {
    return "PI is {PI}";
}
```

## Data types

```rs
// nil
let nil_value = nil;

// strings
let name = "AIScript";

// integers
let age = 18;
let negative = -1;
let hex = 0x10;
let octal = 0o10;
let binary = 0b10;
let big = 1_000_000_000_000;

// floats
let pi = 3.14;

// booleans
let flag1 = true;
let flag2 = false;

// arrays
let numbers = [1, 2, 3, 4, 5];

// maps
let person = {
    "name": "AIScript",
    "age": 18,
    "is_male": true,
    "hobbies": ["reading", "coding", "gaming"],
    "address": {
        "city": "Beijing",
        "street": "No. 100, Xihuan Road",
        "zipcode": "100000",
        "country": "China",
        "phone": "13800138000",
    }
};

//  tuples
let person = ("AIScript", 18, true);

```

## Operators

```rs

// arithmetic operators
let a = 1 + 2;
let b = 1 - 2;
let c = 1 * 2;
let d = 1 / 2;
let e = 1 % 2;

// logical operators
let a = true and false;
let b = true or false;
let c = not true;

// comparison operators
let a = 1 == 2;
let b = 1 != 2;
let c = 1 > 2;
let d = 1 < 2;
let e = 1 >= 2;
let f = 1 <= 2;

// bitwise operators
let a = 1 & 2;
let b = 1 | 2;
let c = 1 ^ 2;
let d = 1 << 2;
let e = 1 >> 2;

// assignment operators
let a = 1;
a += 2;
a -= 2;
a *= 2;
a /= 2;
a %= 2;

// in operator
let a = 1 in [1, 2, 3];
let b = 1 not in [1, 2, 3];
```

## String

```rs
// string interpolation
let a = "AIScript";
let b = "Hello, {a}!";

// string concatenation
let a = "AIScript";
let b = "Hello, " + a + "!";

// string format
let a = "AIScript";
let b = "Hello, {a}!";

// string length
let a = "AIScript";
let b = a.len();

```

## Slice

```rs
// array slice
let a = [1, 2, 3, 4, 5];
let b = a[0:3]; // [1, 2, 3]
let c = a[3:]; // [4, 5]
let d = a[:3]; // [1, 2, 3]

// string slice
// string slice
let a = "AIScript";
let b = a[0:3]; // "Web"
let c = a[3:]; // "Script"
let d = a[:3]; // "Web"

```

## Control flow

```rs
let age = 20;

if age > 60 {
    print("You are a senior");
} else if age > 18 and age <= 60 {
    print("You are an adult");
} else if age > 12 and age <= 18 {
    print("You are a teenager");
} else {
    print("You are a child");
}
```

## Match

```rs
let language = "AIScript";

match language {
    "AIScript" => print("AIScript"),
    "Rust" => print("Rust"),
    "Python" => print("Python"),
    "JavaScript" => print("JavaScript"),
    _ => print("Unknown language"),
}
```

## Functions

```rs
fn add(a: int, b: int) -> int {
    return a + b;
}
```

## Closures

```rs
fn add(a: int) -> fn {
    fn _add(b: int) -> int {
        return a + b;
    }

    return _add;
}

let add5 = add(5);
print(add5(10)); // 15

```

## Loops

AIScript only has one keyword for loops, the `for` keyword. You can use it to iterate over a list, a map, or a range. You can also use it achieve unconditional loops and `do while` loops.

### Iterate over a list

```rs
let numbers = [1, 2, 3, 4, 5];

for number in numbers {
    print(number);
}
```

### Iterate over a map

```rs
let person = {
    "name": "AIScript",
    "age": 18,
    "gender": "male",
};

for (key, value) in person {
    print("{key}: {value}");
}
```

### Iterate over range

```rs
for i in 1..10 {
    print(i);
}
```

### Continue

```js
for i in 1..10 {
    if i % 2 == 0 {
        continue;
    }
    print(i);
}
```
## Error handling

Every type sufix with `!` is an error type. Use `raise` keyword to raise an error,

```js
fn div(a: int, b: int) -> int | DivByZero! {
    if b == 0 {
        raise DivByZero!;
    }
    return a / b;
}

// handle error
let e = div(10, 0) |err| {
    raise err;
};

// syntax sugar to avoid try catch and raise
let e = div(10, 0)?;

// handle error late
div(10, 0) |err| {
    match err {
        DivByZero! => print("DivByZero"),
        _ => print("UnknownError"),
    }
};
```
