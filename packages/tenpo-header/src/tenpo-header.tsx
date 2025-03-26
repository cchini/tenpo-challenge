import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root-component';
import '../config/i18n';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary() {
    return null;
  },
  loadRootComponent: (props) =>
    new Promise((resolve) => {
      resolve(() => <Root />);
    }),
});

export const { bootstrap, mount, unmount } = lifecycles;
