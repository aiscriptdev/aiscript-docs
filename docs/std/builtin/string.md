# String

The `String` type provides a variety of methods for string manipulation and analysis.

## is_empty()

Checks if the string is empty.

**Return Type**: `Boolean`

**Example**:
```rust
let empty = "".is_empty(); // true
let not_empty = "hello".is_empty(); // false
```

## to_uppercase()

Converts all characters in the string to uppercase.

**Return Type**: `String`

**Example**:
```rust
let upper = "hello".to_uppercase(); // "HELLO"
```

## to_lowercase()

Converts all characters in the string to lowercase.

**Return Type**: `String`

**Example**:
```rust
let lower = "HELLO".to_lowercase(); // "hello"
```

## trim()

Removes whitespace from both ends of the string.

**Return Type**: `String`

**Example**:
```rust
let trimmed = "  hello  ".trim(); // "hello"
```

## trim_start()

Removes whitespace from the start of the string.

**Return Type**: `String`

**Example**:
```rust
let trimmed = "  hello".trim_start(); // "hello"
```

## trim_end()

Removes whitespace from the end of the string.

**Return Type**: `String`

**Example**:
```rust
let trimmed = "hello  ".trim_end(); // "hello"
```

## contains(substr: string)

Checks if the string contains the specified substring.

**Parameters**:
- `substr`: The substring to search for.

**Return Type**: `Boolean`

**Example**:
```rust
let result = "hello world".contains("world"); // true
```

## starts_with(prefix: string)

Checks if the string starts with the specified prefix.

**Parameters**:
- `prefix`: The prefix to check.

**Return Type**: `Boolean`

**Example**:
```rust
let result = "hello world".starts_with("hello"); // true
```

## ends_with(suffix: string)

Checks if the string ends with the specified suffix.

**Parameters**:
- `suffix`: The suffix to check.

**Return Type**: `Boolean`

**Example**:
```rust
let result = "hello world".ends_with("world"); // true
```

## index_of(substr: string, start?: number)

Finds the index of the first occurrence of the substring, starting from the specified position.

**Parameters**:
- `substr`: The substring to search for.
- `start`: The position to start the search from (optional).

**Return Type**: `Number`

**Example**:
```rust
let index = "hello world".index_of("world"); // 6
```

## last_index_of(substr: string)

Finds the index of the last occurrence of the substring.

**Parameters**:
- `substr`: The substring to search for.

**Return Type**: `Number`

**Example**:
```rust
let index = "hello world world".last_index_of("world"); // 12
```

## substring(start: number, end?: number)

Extracts a substring from the string, starting and ending at the specified indices.

**Parameters**:
- `start`: The starting index.
- `end`: The ending index (optional).

**Return Type**: `String`

**Example**:
```rust
let sub = "hello world".substring(0, 5); // "hello"
```

## slice(start: number, end?: number)

Extracts a section of the string and returns it as a new string, without modifying the original string.

**Parameters**:
- `start`: The starting index.
- `end`: The ending index (optional).

**Return Type**: `String`

**Example**:
```rust
let slice = "hello world".slice(0, 5); // "hello"
```

## split(delimiter: string)

Splits the string into an array of substrings using the specified delimiter.

**Parameters**:
- `delimiter`: The delimiter to split the string by.

**Return Type**: `Array<String>`

**Example**:
```rust
let parts = "hello world".split(" "); // ["hello", "world"]
```

## join(array: Array<string>)

Joins an array of strings into a single string, with the original string as the separator.

**Parameters**:
- `array`: The array of strings to join.

**Return Type**: `String`

**Example**:
```rust
let joined = ",".join(["a", "b", "c"]); // "a,b,c"
```

## regex_match(pattern: string)

Checks if the string matches the specified regular expression pattern.

**Parameters**:
- `pattern`: The regex pattern to match.

**Return Type**: `Boolean`

**Example**:
```rust
let match = "hello".regex_match("^h"); // true
```

## regex_replace(pattern: string, replacement: string)

Replaces occurrences of the regex pattern with the replacement string.

**Parameters**:
- `pattern`: The regex pattern to replace.
- `replacement`: The string to replace matches with.

**Return Type**: `String`

**Example**:
```rust
let replaced = "hello world".regex_replace("world", "there"); // "hello there"
```

## repeat(count: number)

Repeats the string the specified number of times.

**Parameters**:
- `count`: The number of times to repeat the string.

**Return Type**: `String`

**Example**:
```rust
let repeated = "ha".repeat(3); // "hahaha"
```

## reverse()

Reverses the characters in the string.

**Return Type**: `String`

**Example**:
```rust
let reversed = "hello".reverse(); // "olleh"
```

## replace(from: string, to: string)

Replaces occurrences of a substring with another substring.

**Parameters**:
- `from`: The substring to replace.
- `to`: The substring to replace with.

**Return Type**: `String`

**Example**:
```rust
let replaced = "hello world".replace("world", "there"); // "hello there"
```