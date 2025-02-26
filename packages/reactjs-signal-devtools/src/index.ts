import { createElement } from 'react';

import { createRoot } from 'react-dom/client';
import { createEffect, type TWritableSignal } from 'reactjs-signal';

export function mountStoreDevtool(
  storeName: string,
  store: TWritableSignal<any>,
  rootElement?: HTMLElement
) {
  const ReactjsSignalDevtool = () => {
    return null;
  };

  (ReactjsSignalDevtool as any).displayName = `((${storeName})) devtool`;

  if (typeof document === 'undefined') {
    return;
  }

  if (!rootElement) {
    let root = document.getElementById(`reactjs-signal-devtools-${storeName}`);
    if (!root) {
      root = document.createElement('div');
      root.id = `reactjs-signal-devtools-${storeName}`;
    }

    document.body.appendChild(root);
    rootElement = root;
  }

  const newRoot = createRoot(rootElement);

  const renderDevtool = (props: any | void) => {
    if (!props) {
      return;
    }

    newRoot.render(createElement(ReactjsSignalDevtool, props));
  };

  renderDevtool(
    typeof store() === 'object'
      ? store()
      : {
        state: store(),
      }
  );

  createEffect(() => {
    renderDevtool(
      typeof store() === 'object'
        ? store()
        : {
          state: store(),
        }
    );
  });
}
