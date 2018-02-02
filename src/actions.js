export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CLEAR_ALL = 'CLEAR_ALL';
export const SELECT_ROW = 'SELECT_ROW';
export const ADD_1000_TODOS = 'ADD_1000_TODOS';
export const DROP = 'DROP';

export function addTodo(text) {
    return { type: ADD_TODO, text }
}

/*function addTodoWithoutCheck(text) {
    return { type: 'ADD_TODO', text };
}
export function addTodo(text) {
    return function (dispatch, getState) {
        if (getState().todoList.size >= 3) {
            alert('todo最多只允许三个');
            return;
        }
        dispatch(addTodoWithoutCheck(text));
    }
}*/

export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id }
}

export function deleteTodo(id) {
    return { type: DELETE_TODO, id }
}

export function clearAll() {
    return { type: CLEAR_ALL }
}

export function selectRow(id) {
    return { type: SELECT_ROW, id }
}

export function add_1000Todos() {
    return { type: ADD_1000_TODOS }
}

export function drop(e, targetId) {
    const sourceId = e.dataTransfer.getData("sourceId");
    return { type: DROP, sourceId, targetId }
}