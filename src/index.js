import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/App/App';
// GitHub Pages не умеет работать с роутером, поэтому используем HashRouter вместо BrowserRouter, хоть это и не рекомендуется
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <StrictMode>
      {/* GitHub Pages не умеет работать с роутером, поэтому используем HashRouter вместо BrowserRouter, хоть это и не рекомендуется */}
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  </Provider>
);
