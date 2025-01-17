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
countSignal.set(10); // sets the value to 10
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
const doubleSignal = createComputed(() => countSignal.get() * 2);
```

#### Parameters

- `fn` (`() => T`): A getter function returning a computed value.

#### Returns

- `ISignal<T>`: The created computed signal.

### `createEffect`

Creates a side effect in Alien Signals.

#### Example

```typescript
const countSignal = createSignal(1);
createEffect(() => {
  console.log('Count is', countSignal.get());
});
```

#### Parameters

- `fn` (`() => T`): A function that will run whenever its tracked signals update.

#### Returns

- `Effect<T>`: The created effect object.

### `createSignalScope`

Creates an Alien Signals effect scope. This scope can manage multiple effects, allowing you to stop or start them together.

#### Example

```typescript
const scope = createSignalScope();
scope.run(() => {
  // create effects in here...
});
```

#### Returns

- `EffectScope`: The created effect scope.

### `unstable_createAsyncComputed`

Creates an async computed signal in Alien Signals. The getter is an async generator that yields dependencies and finally resolves to a computed value.

#### Example

```typescript
const asyncComp = createAsyncComputed<number>(async function* () {
  yield someDependency;
  return 42;
});
```

#### Parameters

- `getter` (`() => AsyncGenerator<Dependency, T>`): An async generator returning dependencies and ultimately a value.

#### Returns

- `AsyncComputed<T>`: The created async computed signal.

### `unstable_createAsyncEffect`

Creates an async effect in Alien Signals. The function is an async generator that yields dependencies as they are discovered.

#### Example

```typescript
createAsyncEffect(async function* () {
  yield someDependency;
  console.log('Async effect done!');
});
```

#### Parameters

- `fn` (`() => AsyncGenerator<Dependency, T>`): An async generator returning dependencies.

#### Returns

- `Promise<T>`: The created async effect object.

### `unstable_createComputedArray`

Creates a computed array signal in Alien Signals, deriving a reactive array from an original signal array.

#### Example

```typescript
const numbersSignal = createSignal([1, 2, 3]);
const compArray = createComputedArray(numbersSignal, (itemSignal, i) => () => {
  return itemSignal.get() * 2;
});
```

#### Parameters

- `arr` (`ISignal<I[]>`): Signal containing an array.
- `getGetter` (`(itemSignal: ISignal<I>, index: number) => () => O`): A function returning a getter for each item signal.

#### Returns

- `Readonly<O[]>`: A proxied array signal.

### `unstable_createComputedSet`

Creates a computed Set signal in Alien Signals that tracks changes to a source Set signal.

#### Example

```typescript
const setSignal = createSignal(new Set([1, 2]));
const compSet = createComputedSet(setSignal);
```

#### Parameters

- `source` (`IWritableSignal<Set<T>>`): A signal containing a Set.

#### Returns

- `ISignal<Set<T>>`: A computed signal referencing that Set.

### `unstable_createEqualityComputed`

Creates an equality-based computed signal, only updating when the new value is not deeply equal to the old value.

#### Example

```typescript
const eqComp = createEqualityComputed(() => {
  return { foo: 'bar' };
});
```

#### Parameters

- `getter` (`() => T`): A function returning the value to compare.

#### Returns

- `ISignal<T>`: An equality computed signal.

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
const doubleSignal = createComputed(() => countSignal.get() * 2);
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
    console.log('Signal changed:', someSignal.get());
  });
  return null;
}
```

#### Parameters

- `fn` (`() => void`): The effect function to run.

### `useSignalScope`

React hook for managing an Alien Signals effect scope. All signals/effects created inside this scope run when the component mounts, and are stopped automatically when the component unmounts.

#### Example

```typescript
function ScopedEffects() {
  const scope = useSignalScope();
  useEffect(() => {
    scope.run(() => {
      createEffect(() => {
        console.log('Scoped effect:', someSignal.get());
      });
    });
  }, [scope]);
  return null;
}
```

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
  alienSignal.set(value);
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

### `unstable_useAsyncComputedValue`

React hook to read from an async computed signal. The hook fetches the current value, subscribing to changes via `useSyncExternalStore`, and triggers a `get()` call to retrieve updated data. Maintains an internal state for the resolved value of the promise.

#### Example

```typescript
const asyncSignal = createAsyncComputed<number>(async function*() {
  const val = someSignal.get();
  yield Promise.resolve(someSignal); // track async dep
  return val * 2;
});

function AsyncDisplay() {
  const value = useAsyncComputedValue(asyncSignal);
  return <div>Value: {String(value)}</div>;
}
```

#### Parameters

- `alienAsyncComp` (`AsyncComputed<T>`): The async computed signal to read.

#### Returns

- `T | undefined`: The resolved value (or undefined if not yet resolved).

### `unstable_useAsyncEffect`

React hook to run an asynchronous effect whenever the component mounts, cleaning up when it unmounts.

#### Example

```typescript
useAsyncEffect(async function* () {
  yield someDependency;
  console.log('Async side effect complete!');
});
```

#### Parameters

- `fn` (`() => AsyncGenerator<Dependency, T>`): An async generator representing the effect logic.


## Refer

 React Alien Signals is a **TypeScript** library that provides hooks built on top of [Alien Signals](https://github.com/stackblitz/alien-signals).
