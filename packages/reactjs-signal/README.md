<p align="center">
<a href="https://www.npmjs.com/package/reactjs-signal" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/uil:comment-verify.svg?color=%23b3ff75" alt="logo" width='100'/></a>
</p>

<p align="center">
  Share Store State with Signal Pattern
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/reactjs-signal" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/reactjs-signal.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/reactjs-signal" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/reactjs-signal.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=reactjs-signal" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/reactjs-signal" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/reactjs-signal/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/reactjs-signal/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/reactjs-signal" alt="License" /></a>
</p>



## Installation

```bash
npm install reactjs-signal
```

## Devtools

- [reactjs-signal-devtools](https://github.com/hunghg255/reactjs-signal/tree/main/packages/reactjs-signal-devtools)

## Usage

```tsx
import React from 'react';
import { useSignal } from 'reactjs-signal';

const App = () => {
  const [state, setState] = useSignal({ count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => setState({ count: state.count + 1 })}>Increment</button>
    </div>
  );
};
```

## API Documentation

### `createSignal`

Creates a writable Alien Signal.

#### Example

```typescript
const countSignal = createSignal(0);
countSignal(10); // sets the value to 10
```

#### Parameters

- `initialValue` (`T`): The initial value of the signal.

#### Returns

- `IWritableSignal<T>`: The created Alien Signal.

### `createComputed`

Creates a computed Alien Signal based on a getter function.

#### Example

```typescript
const countSignal = createSignal(1);
const doubleSignal = createComputed(() => countSignal() * 2);
```

#### Parameters

- `fn` (`() => T`): A getter function returning a computed value.

#### Returns

- `ISignal<T>`: The created computed signal.


### `useSignal`

React hook returning `[value, setValue]` for a given Alien Signal. Uses `useSyncExternalStore` for concurrency-safe re-renders.

#### Example

```typescript
const countSignal = createSignal(0);
function Counter() {
  const [count, setCount] = useSignal(countSignal);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### Parameters

- `alienSignal` (`IWritableSignal<T>`): The signal to read/write.

#### Returns

- `[T, (val: T | ((oldVal: T) => T)) => void]`: A tuple `[currentValue, setValue]`.

### `useSignalValue`

React hook returning only the current value of an Alien Signal (or computed). No setter is provided.

#### Example

```typescript
const countSignal = createSignal(0);
const doubleSignal = createComputed(() => countSignal() * 2);
function Display() {
  const count = useSignalValue(countSignal);
  const double = useSignalValue(doubleSignal);
  return <div>{count}, {double}</div>;
}
```

#### Parameters

- `alienSignal` (`IWritableSignal<T>`): The signal to read.

#### Returns

- `T`: The current value.

### `useSetSignal`

React hook returning only a setter function for an Alien Signal. No current value is provided, similar to Jotai's `useSetAtom`.

#### Example

```typescript
const countSignal = createSignal(0);
function Incrementor() {
  const setCount = useSetSignal(countSignal);
  return <button onClick={() => setCount((c) => c + 1)}>+1</button>;
}
```

#### Parameters

- `alienSignal` (`IWritableSignal<T>`): The signal to write.

#### Returns

- `(val: T | ((oldVal: T) => T)) => void`: A setter function.

### `useSignalEffect`

React hook for running a side effect whenever Alien Signals' dependencies used in `fn` change. The effect is cleaned up on component unmount.

#### Example

```typescript
function Logger() {
  useSignalEffect(() => {
    console.log('Signal changed:', someSignal());
  });
  return null;
}
```

#### Parameters

- `fn` (`() => void`): The effect function to run.


<!-- /**
 * React hook to initialize a signal with a value when hydrating from server.
 * @param alienSignal
 * @param value
 * @returns
 *
 * @template T - The type of the signal value.
 * @param {IWritableSignal<T>} alienSignal - The signal to hydrate.
 * @param {T} value - The value to hydrate the signal with.
 */
export function useHydrateSignal<T>(alienSignal: IWritableSignal<T>, value: T): void {
  alienSignal(value);
} -->

### `useHydrateSignal`

React hook to initialize a signal with a value when hydrating from server.

#### Example

```typescript
const countSignal = createSignal(0);
useHydrateSignal(countSignal, 10);
```

#### Parameters
- `alienSignal`: The signal to hydrate.
- `value`: initial value

#### Returns

- `EffectScope`: The created effect scope.


## Refer

 React Alien Signals is a **TypeScript** library that provides hooks built on top of [Alien Signals](https://github.com/stackblitz/alien-signals).
