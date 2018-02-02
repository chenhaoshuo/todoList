import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_ALL, SELECT_ROW, ADD_1000_TODOS, DROP } from './actions';
import { Map, List } from 'immutable';
import storage from './util/storage';
import { newGuid } from './util/newGrid';
import undoable, { distinctState } from 'redux-undo';

function todos(state = [], action) {
    let index, todo;
    switch (action.type) {
        case ADD_TODO:
            let id = newGuid();
            todo = Map({ text: action.text, id: id, isFinished: false });
            storage.add("todoList", todo);
            return state.push(todo);
        case TOGGLE_TODO:
            index = state.findIndex(item => item.get('id') === action.id);
            todo = state.get(index);
            state = state.setIn([index, 'isFinished'], !todo.get('isFinished'));
            storage.set("todoList", state);
            return state;
        case DELETE_TODO:
            index = state.findIndex(item => item.get('id') === action.id);
            state = state.delete(index);
            storage.set("todoList", state);
            return state;
        case CLEAR_ALL:
            if (confirm("确定要清除所有项目吗？")) {
                localStorage.removeItem("todoList_todoList");
                return List();
            }
            return state;
        case ADD_1000_TODOS:
            for (let i = 0; i < 1000; i++) {
                id = newGuid();
                state = state.push(Map({ text: id, id: id, isFinished: false }));
            }
            storage.set("todoList", state);
            return state;
        case DROP:
            const from = state.findIndex(item => item.get('id') === action.sourceId);
            const to = state.findIndex(item => item.get('id') === action.targetId);
            const item = state.get(from);
            state = state.delete(from);
            let index = from <= to ? to : (to + 1);
            state = state.insert(index, item);
            storage.set("todoList", state);
            return state;
        default:
            return state;
    }
}

function selectId(state = '', action) {
    switch (action.type) {
        case SELECT_ROW:
            if (state === action.id) return '';
            return action.id;
        default:
            return state;
    }
}

const undoableTodos = undoable(todos, { filter: distinctState() });
const todoApp = combineReducers({ todoList: undoableTodos, selectId });

export default todoApp;
