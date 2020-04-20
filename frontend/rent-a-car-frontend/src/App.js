import React, { Component } from 'react';
import './App.css';
import Main from './Components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import promise from "redux-promise";
import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer'

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composePlugin(applyMiddleware(promise, thunk)));

//App Component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
