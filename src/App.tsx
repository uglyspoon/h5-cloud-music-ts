import React from 'react';
import './App.style.ts';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import store from './store';
import { GlobalStyle } from './App.style';
import { IconStyle } from 'assets/iconfont';
import './fix.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
};

export default App;
