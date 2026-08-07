import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import './styles/reset.css';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>);
