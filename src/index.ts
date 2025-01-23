'use client';
/**
 *
 * React Alien Signals is a **TypeScript** library that provides hooks built on top of [Alien Signals](https://github.com/stackblitz/alien-signals).
 * It offers a seamless integration with React, ensuring concurrency-safe re-renders without tearing.
 *
 * @module reactjs-signal
 */

import { signal, computed, effect, effectScope } from 'alien-signals';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

type IWritableSignal<T> = {
  (): T;
  (value: T): void;
};

const hydratedMap: WeakMap<IWritableSignal<any>, WeakSet<IWritableSignal<any>>> = new WeakMap()

const getHydratedSet = (store: IWritableSignal<any>) => {
  let hydratedSet = hydratedMap.get(store)
  if (!hydratedSet) {
    hydratedSet = new WeakSet()
    hydratedMap.set(store, hydratedSet)
  }
  return hydratedSet
}

/**
 * Creates a writable Alien Signal.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(0);
 * countSignal(10); // sets the value to 10
 * ```
 *
 * @template T - The type of the signal value.
 * @param {T} initialValue - The initial value of the signal.
 * @returns {IWritableSignal<T>} The created Alien Signal.
 */
export function createSignal<T>(initialValue: T) {
  return signal<T>(initialValue);
}


/**
 * Creates a writable Alien Signal that persists its value in localStorage.
 *
 * @template T - The type of the signal value.
 * @param {string} key - The localStorage key to use for persistence.
 * @param {T} initialValue - The initial value of the signal.
 * @returns {IWritableSignal<T>} The created Alien Signal.
 */
export function createSignalStorage<T>(key: string, initialValue: T): IWritableSignal<T> {
  const storedValue = localStorage.getItem(key);
  let initial: T;

  if (storedValue) {
    try {
      initial = JSON.parse(storedValue) as T;
    } catch (e) {
      console.error(`Error parsing localStorage for key "${key}", using initial value.`, e);
      initial = initialValue;
    }
  } else {
    initial = initialValue;
  }

  const signalInstance = createSignal<T>(initial);

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(signalInstance()));
  });

  return signalInstance;
}

/**
 * Creates a computed Alien Signal based on a getter function.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(1);
 * const doubleSignal = createComputed(() => countSignal() * 2);
 * ```
 *
 * @template T - The type of the computed value.
 * @param {() => T} fn - A getter function returning a computed value.
 * @returns {ISignal<T>} The created computed signal.
 */
export function createComputed<T>(fn: () => T) {
  return computed<T>(fn);
}

/**
 * Creates a side effect in Alien Signals.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(1);
 * createEffect(() => {
 *   console.log('Count is', countSignal());
 * });
 * ```
 *
 * @template T - The type of the effect value.
 * @param {() => T} fn - A function that will run whenever its tracked signals update.
 * @returns {Effect<T>} The created effect object.
 */
export function createEffect<T>(fn: () => T) {
  return effect(fn);
}

/**
 * React hook returning `[value, setValue]` for a given Alien Signal.
 * Uses useSyncExternalStore for concurrency-safe re-renders.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(0);
 * function Counter() {
 *   const [count, setCount] = useSignal(countSignal);
 *   return <button onClick={() => setCount(count + 1)}>{count}</button>;
 * }
 * ```
 *
 * @template T - The type of the signal value.
 * @param {IWritableSignal<T>} alienSignal - The signal to read/write.
 * @returns {[T, (val: T | ((oldVal: T) => T)) => void]} A tuple [currentValue, setValue].
 */
export function useSignal<T>(
  alienSignal: IWritableSignal<T>,
): [T, (val: T | ((oldVal: T) => T)) => void] {
  const value = useSyncExternalStore(
    (callback) => {
      const eff = effect(() => {
        alienSignal(); // track
        callback();
      });
      return () => eff();
    },
    () => alienSignal(),
    () => alienSignal(), // server snapshot
  );

  const setValue = (val: T | ((oldVal: T) => T)) => {
    if (typeof val === 'function') {
      alienSignal((val as (oldVal: T) => T)(alienSignal()));
    } else {
      alienSignal(val);
    }
  };

  return [value, setValue];
}

/**
 * React hook returning only the current value of an Alien Signal (or computed).
 * No setter is provided.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(0);
 * const doubleSignal = createComputed(() => countSignal() * 2);
 * function Display() {
 *   const count = useSignalValue(countSignal);
 *   const double = useSignalValue(doubleSignal);
 *   return <div>{count}, {double}</div>;
 * }
 * ```
 *
 * @template T - The type of the signal value.
 * @param {IWritableSignal<T>} alienSignal - The signal to read.
 * @returns {T} The current value.
 */
export function useSignalValue<T>(alienSignal: IWritableSignal<T>): T {
  return useSyncExternalStore(
    (callback) => {
      const eff = effect(() => {
        alienSignal();
        callback();
      });
      return () => eff();
    },
    () => alienSignal(),
    () => alienSignal(),
  );
}

/**
 * React hook returning only a setter function for an Alien Signal.
 * No current value is provided, similar to Jotai's useSetAtom.
 *
 * @example
 * ```typescript
 * const countSignal = createSignal(0);
 * function Incrementor() {
 *   const setCount = useSetSignal(countSignal);
 *   return <button onClick={() => setCount((c) => c + 1)}>+1</button>;
 * }
 * ```
 *
 * @template T - The type of the signal value.
 * @param {IWritableSignal<T>} alienSignal - The signal to write.
 * @returns {(val: T | ((oldVal: T) => T)) => void} A setter function.
 */
export function useSetSignal<T>(
  alienSignal: IWritableSignal<T>,
): (val: T | ((oldVal: T) => T)) => void {
  return (val) => {
    if (typeof val === 'function') {
      alienSignal((val as (oldVal: T) => T)(alienSignal()));
    } else {
      alienSignal(val);
    }
  };
}

/**
 * React hook for running a side effect whenever Alien Signals' dependencies
 * used in `fn` change. The effect is cleaned up on component unmount.
 *
 * @example
 * ```typescript
 * function Logger() {
 *   useSignalEffect(() => {
 *     console.log('Signal changed:', someSignal());
 *   });
 *   return null;
 * }
 * ```
 *
 * @param {() => void} fn - The effect function to run.
 */
export function useSignalEffect(fn: () => void): void {
  useEffect(() => {
    const eff = effect(fn);
    return () => eff();
  }, [fn]);
}

/**
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
  const hydratedSet = getHydratedSet(alienSignal)

  if (hydratedSet.has(alienSignal)) return

  hydratedSet.add(alienSignal)
  alienSignal(value);
}
