# reactjs-signal-devtools

Inspect your [reactjs-signal](https://github.com/hunghg255/reactjs-signal) store in React DevTools 🐻⚛️

<img width="500" src="/assets/devtools.png"/>

## Usage

```ts
import { createSignal } from 'reactjs-signal';
import { mountStoreDevtool } from 'reactjs-signal-devtools';

export const signalCount = createSignal(0);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', signalCount);
}
```
