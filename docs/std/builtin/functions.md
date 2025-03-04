# Built-in Functions

This document provides an overview of the built-in functions available in the AIScript VM.

## abs()

Returns the absolute value of a number.

**Parameters**:
- A single number.

**Return Type**: `Number`

**Example**:
```rust
let result = abs(-5); // result is 5
```

## all()

Returns `true` if all elements of the array are true.

**Parameters**:
- An array of boolean values.

**Return Type**: `Boolean`

**Example**:
```rust
let result = all([true, true, false]); // result is false
```

## any()

Returns `true` if any element of the array is true.

**Parameters**:
- An array of boolean values.

**Return Type**: `Boolean`

**Example**:
```rust
let result = any([false, false, true]); // result is true
```

## ascii()

Converts a value to its ASCII representation.

**Parameters**:
- A single value.

**Return Type**: `String`

**Example**:
```rust
let result = ascii(65); // result is "A"
```

## bin()

Converts a number to its binary representation.

**Parameters**:
- A single number.

**Return Type**: `String`

**Example**:
```rust
let result = bin(5); // result is "101"
```

## bool()

Converts a value to a boolean.

**Parameters**:
- A single value.

**Return Type**: `Boolean`

**Example**:
```rust
let result = bool(0); // result is false
```

## callable()

Checks if a value is callable.

**Parameters**:
- A single value.

**Return Type**: `Boolean`

**Example**:
```rust
let result = callable(someFunction); // result is true
```

## chr()

Converts an ASCII code to its character representation.

**Parameters**:
- A single number representing an ASCII code.

**Return Type**: `String`

**Example**:
```rust
let result = chr(65); // result is "A"
```

## filter()

Filters elements of an array based on a predicate function.

**Parameters**:
- An array and a predicate function.

**Return Type**: `Array`

**Example**:
```rust
let result = filter([1, 2, 3], x => x > 1); // result is [2, 3]
```

## float()

Converts a value to a floating-point number.

**Parameters**:
- A single value.

**Return Type**: `Number`

**Example**:
```rust
let result = float("3.14"); // result is 3.14
```

## format()

Formats a string using placeholders.

**Parameters**:
- A format string and values to replace placeholders.

**Return Type**: `String`

**Example**:
```rust
let result = format("Hello, {}!", "world"); // result is "Hello, world!"
```

## hex()

Converts a number to its hexadecimal representation.

**Parameters**:
- A single number.

**Return Type**: `String`

**Example**:
```rust
let result = hex(255); // result is "ff"
```

## input()

Reads a line of input from the user.

**Parameters**:
- An optional prompt string.

**Return Type**: `String`

**Example**:
```rust
let name = input("Enter your name: ");
```

## int()

Converts a value to an integer.

**Parameters**:
- A single value.

**Return Type**: `Number`

**Example**:
```rust
let result = int("42"); // result is 42
```

## len()

Returns the length of a string, array, or object.

**Parameters**:
- A string, array, or object.

**Return Type**: `Number`

**Example**:
```rust
let length = len([1, 2, 3]); // length is 3
```

## map()

Applies a function to each element of an array.

**Parameters**:
- An array and a function.

**Return Type**: `Array`

**Example**:
```rust
let result = map([1, 2, 3], x => x * 2); // result is [2, 4, 6]
```

## max()

Returns the maximum value from a list of numbers or an array.

**Parameters**:
- A list of numbers or a single array.

**Return Type**: `Number`

**Example**:
```rust
let result = max(1, 2, 3); // result is 3
```

## min()

Returns the minimum value from a list of numbers or an array.

**Parameters**:
- A list of numbers or a single array.

**Return Type**: `Number`

**Example**:
```rust
let result = min(1, 2, 3); // result is 1
```

## oct()

Converts a number to its octal representation.

**Parameters**:
- A single number.

**Return Type**: `String`

**Example**:
```rust
let result = oct(8); // result is "10"
```

## ord()

Returns the ASCII code of a character.

**Parameters**:
- A single character.

**Return Type**: `Number`

**Example**:
```rust
let result = ord("A"); // result is 65
```

## print()

Prints a value to the console.

**Parameters**:
- A single value.

**Return Type**: `nil`

**Example**:
```rust
print("Hello, world!");
```

## round()

Rounds a number to the nearest integer.

**Parameters**:
- A single number.

**Return Type**: `Number`

**Example**:
```rust
let result = round(3.5); // result is 4
```

## str()

Converts a value to a string.

**Parameters**:
- A single value.

**Return Type**: `String`

**Example**:
```rust
let result = str(123); // result is "123"
```

## sum()

Returns the sum of elements in an array.

**Parameters**:
- An array of numbers.

**Return Type**: `Number`

**Example**:
```rust
let result = sum([1, 2, 3]); // result is 6
```

## zip()

Combines multiple arrays into a single array of tuples.

**Parameters**:
- Multiple arrays.

**Return Type**: `Array`

**Example**:
```rust
let result = zip([1, 2], [3, 4]); // result is [(1, 3), (2, 4)]
```