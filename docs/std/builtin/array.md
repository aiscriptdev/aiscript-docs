# Array

The `Array` type provides various methods for array manipulation, searching, and ordering.

## append(item)

Adds an item to the end of the array and returns the modified array.

**Parameters**:
- `item`: The item to add to the end of the array.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3];
numbers.append(4); // [1, 2, 3, 4]
```

## extend(array)

Extends the array by appending all items from another array and returns the modified array.

**Parameters**:
- `array`: The array containing items to append.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3];
numbers.extend([4, 5]); // [1, 2, 3, 4, 5]
```

## insert(index, item)

Inserts an item at the specified position in the array and returns the modified array.

**Parameters**:
- `index`: The index before which to insert the item.
- `item`: The item to insert.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 4];
numbers.insert(2, 3); // [1, 2, 3, 4]
```

## remove(item)

Removes the first occurrence of the specified item from the array and returns the modified array.

**Parameters**:
- `item`: The item to remove.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3, 2];
numbers.remove(2); // [1, 3, 2]
```

## pop(index?)

Removes and returns the item at the specified position. If no index is provided, removes and returns the last item.

**Parameters**:
- `index`: The index of the item to remove (optional).

**Return Type**: The removed item.

**Example**:
```js
let numbers = [1, 2, 3];
let last = numbers.pop(); // 3, numbers becomes [1, 2]
let first = numbers.pop(0); // 1, numbers becomes [2]
```

## clear()

Removes all items from the array and returns the modified (empty) array.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3];
numbers.clear(); // []
```

## index(item, start?, end?)

Returns the index of the first occurrence of the specified item within the optional start and end range.

**Parameters**:
- `item`: The item to search for.
- `start`: The index to start the search from (optional).
- `end`: The index to end the search at (optional).

**Return Type**: `Number` (Returns -1 if the item is not found)

**Example**:
```js
let numbers = [10, 20, 30, 20];
numbers.index(20); // 1
numbers.index(20, 2); // 3
```

## count(item)

Returns the number of occurrences of the specified item in the array.

**Parameters**:
- `item`: The item to count.

**Return Type**: `Number`

**Example**:
```js
let numbers = [1, 2, 3, 2, 1];
numbers.count(2); // 2
```

## sort(reverse?)

Sorts the items of the array in place and returns the modified array.

**Parameters**:
- `reverse`: Whether to sort in descending order (optional, default: false).

**Return Type**: `Array`

**Example**:
```js
let numbers = [3, 1, 4, 2];
numbers.sort(); // [1, 2, 3, 4]
numbers.sort(true); // [4, 3, 2, 1]
```

## reverse()

Reverses the elements of the array in place and returns the modified array.

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3];
numbers.reverse(); // [3, 2, 1]
```

## slice(start, end?)

Returns a shallow copy of a portion of the array into a new array, without modifying the original array.

**Parameters**:
- `start`: The beginning index (can be negative to index from the end).
- `end`: The end index (optional, can be negative to index from the end).

**Return Type**: `Array`

**Example**:
```js
let numbers = [1, 2, 3, 4, 5];
numbers.slice(1, 4); // [2, 3, 4]
numbers.slice(-2); // [4, 5]
```
