import App from "./app";
import React from 'react';
import ReactDOM from 'react-dom/client';

export default function Main() {
  ReactDOM.createRoot(
      (() => {
        const app = document.createElement('div');
        document.body.append(app);
        return app;
      })(),
  ).render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>,
  );
}
