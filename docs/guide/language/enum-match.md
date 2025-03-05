# Enum and Match

Enums (short for enumerations) and match expressions are powerful features in AIScript that work together to provide type-safe pattern matching. These features are inspired by Rust's enum and match system, offering an elegant way to handle variants and control flow.

## Enums

An enum is a type that can hold one of several possible variants, each with its own associated data. Enums are declared using the `enum` keyword:

```js
enum Color {
    Red,
    Green,
    Blue,
    RGB(int, int, int),
    Hex(str),
}
```

In this example, `Color` can be one of five variants: `Red`, `Green`, `Blue`, `RGB` with three integer values, or `Hex` with a string value.

### Creating Enum Values

You can create enum values using the double colon (`::`) syntax:

```js
let red = Color::Red;
let custom_rgb = Color::RGB(255, 128, 0);
let navy = Color::Hex("#000080");
```

### Enum with Values

Enum variants can have associated values:

```js
enum Shape {
    Circle(float),           // radius
    Rectangle(float, float), // width, height
    Triangle(float, float, float) // sides
}

let circle = Shape::Circle(5.0);
let rectangle = Shape::Rectangle(10.0, 20.0);
let triangle = Shape::Triangle(3.0, 4.0, 5.0);
```

### Enums for Error Types

AIScript uses enums with the `!` suffix to represent error types:

```js
enum NetworkError! {
    ConnectionFailed,
    Timeout(int),
    ServerError(str),
}

fn fetch_data(url: str) -> str | NetworkError! {
    if url == "" {
        raise NetworkError!::ConnectionFailed;
    }
    
    if url == "slow.example.com" {
        raise NetworkError!::Timeout(30);
    }
    
    if url == "error.example.com" {
        raise NetworkError!::ServerError("Internal server error");
    }
    
    return "Data from {url}";
}
```

## Match Expression

The match expression allows you to compare a value against a series of patterns and execute code based on which pattern matches:

```js
let color = Color::RGB(255, 0, 0);

match color {
    Color::Red => print("Basic red"),
    Color::Green => print("Basic green"),
    Color::Blue => print("Basic blue"),
    Color::RGB(r, g, b) => print("RGB({r}, {g}, {b})"),
    Color::Hex(code) => print("Hex color: {code}"),
};
```

### Match with Return Values

Match expressions can return values:

```js
let shape = Shape::Circle(5.0);

let area = match shape {
    Shape::Circle(radius) => 3.14 * radius * radius,
    Shape::Rectangle(width, height) => width * height,
    Shape::Triangle(a, b, c) => {
        // Heron's formula
        let s = (a + b + c) / 2.0;
        return (s * (s - a) * (s - b) * (s - c)) ** 0.5;
    }
};

print("Area: {area}");
```

### Pattern Matching on Different Types

Match works on other data types too, not just enums:

```js
let value = 42;

match value {
    0 => print("Zero"),
    1 | 2 | 3 => print("Small number"),
    n if n < 10 => print("Single digit: {n}"),
    n if n >= 10 and n < 100 => print("Double digits: {n}"),
    _ => print("Large number"),
};
```

### Match with Variable Binding

You can bind values to variables in match patterns:

```js
let point = [10, 20];

match point {
    [0, 0] => print("At origin"),
    [0, y] => print("On y-axis at y={y}"),
    [x, 0] => print("On x-axis at x={x}"),
    [x, y] => print("At position ({x}, {y})"),
};
```

### Exhaustive Matching

Match expressions must be exhaustive – they must cover all possible values:

```js
enum Result<T, E> {
    Ok(T),
    Err(E),
}

let result = Result::Ok("Success");

// This would cause a compile error if `Result::Err` wasn't covered
let message = match result {
    Result::Ok(value) => "Operation succeeded with: {value}",
    Result::Err(error) => "Operation failed with: {error}",
};
```

### Match with Guards

Add conditional guards to match arms for more specific matching:

```js
let num = 15;

match num {
    n if n % 15 == 0 => print("FizzBuzz"),
    n if n % 3 == 0 => print("Fizz"),
    n if n % 5 == 0 => print("Buzz"),
    n => print("{n}"),
};
```

### Destructuring in Match

Match allows deep destructuring of complex data structures:

```js
let user = {
    name: "Alice",
    age: 30,
    address: {
        city: "Wonderland",
        country: "Fictional"
    }
};

match user {
    {name: "Alice", age} => print("Alice is {age} years old"),
    {name, address: {city: "Wonderland"}} => print("{name} lives in Wonderland"),
    {name, age: n} if n < 18 => print("{name} is underage"),
    _ => print("Unknown user pattern"),
};
```

## Advanced Pattern Matching

### Range Patterns

Match values within ranges:

```js
let grade = 85;

let letter = match grade {
    n if n >= 90 and n <= 100 => "A",
    n if n >= 80 and n < 90 => "B",
    n if n >= 70 and n < 80 => "C",
    n if n >= 60 and n < 70 => "D",
    n if n >= 0 and n < 60 => "F",
    _ => "Invalid grade",
};

print("Grade: {letter}");
```

### Or Patterns

Use the pipe (`|`) symbol to match multiple patterns in a single arm:

```js
let day = "Saturday";

let type = match day {
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" => "Weekday",
    "Saturday" | "Sunday" => "Weekend",
    _ => "Invalid day",
};

print("{day} is a {type}.");
```

### Match with Error Handling

Use match with error enums for elegant error handling:

```js
let result = fetch_data("example.com") |err| {
    match err {
        NetworkError!::ConnectionFailed => "Failed to connect",
        NetworkError!::Timeout(seconds) => "Connection timed out after {seconds} seconds",
        NetworkError!::ServerError(message) => "Server error: {message}",
    }
};

print(result);
```

## Practical Examples

### State Machine

```js
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn next_state(current: TrafficLight) -> TrafficLight {
    match current {
        TrafficLight::Red => TrafficLight::Green,
        TrafficLight::Yellow => TrafficLight::Red,
        TrafficLight::Green => TrafficLight::Yellow,
    }
}

let light = TrafficLight::Red;
light = next_state(light);
print(match light {
    TrafficLight::Red => "Stop",
    TrafficLight::Yellow => "Caution",
    TrafficLight::Green => "Go",
}); // "Go"
```

### Option Type

```js
enum Option<T> {
    Some(T),
    None,
}

fn find_user(id: str) -> Option<object> {
    if id == "1234" {
        return Option::Some({
            id: "1234",
            name: "Alice",
            email: "alice@example.com"
        });
    }
    return Option::None;
}

let user_result = find_user("5678");

match user_result {
    Option::Some(user) => print("Found user: {user.name}"),
    Option::None => print("User not found"),
};
```

### Parser Combinator

```js
enum ParseResult<T> {
    Success(T, str),  // Result and remaining input
    Failure(str),     // Error message
}

fn parse_number(input: str) -> ParseResult<int> {
    let match_result = input.match(/^(\d+)(.*)/);
    
    if match_result {
        let [_, num, rest] = match_result;
        return ParseResult::Success(int(num), rest);
    }
    
    return ParseResult::Failure("Expected a number");
}

let result = parse_number("123abc");

match result {
    ParseResult::Success(num, rest) => print("Parsed {num}, remaining: '{rest}'"),
    ParseResult::Failure(msg) => print("Error: {msg}"),
}; // "Parsed 123, remaining: 'abc'"
```

Enums and match expressions in AIScript provide a powerful way to model domain concepts, handle errors, and create clean, maintainable code. By leveraging pattern matching, you can write code that is both safer and more expressive than traditional if-else chains.