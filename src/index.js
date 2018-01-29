import React from "react";
import { render } from "react-dom";
import "./../static/reset.css";
import TodoList from "./components/TodoList";
import { applyMiddleware, createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';
import storage from './util/storage';
import {fromJS} from 'immutable';
import {createLogger} from 'redux-logger';

let preloadedState = {
    todoList: fromJS(storage.get("todoList") || []),
    selectId: '',
};
const logger = createLogger();

let store = createStore(todoApp, preloadedState, applyMiddleware(logger));
let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <TodoList />
    </Provider>,
    rootElement
);