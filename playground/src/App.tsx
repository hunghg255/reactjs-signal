import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

import './App.css';
import { createSignal, useSignal } from 'reactjs-signal';

const countSingal = createSignal(0);

if (import.meta.env.DEV) {
  import('reactjs-signal-devtools').then(({ mountStoreDevtool }) => {
    mountStoreDevtool('count', countSingal);
  });
}

function App() {
  const [count, setCount] = useSignal(countSingal);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
