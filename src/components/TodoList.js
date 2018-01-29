import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, clearAll, selectRow, add_1000Todos, drop } from '../actions'
import storage from "./../util/storage";
import Title from "./Title";
import Container from "./Container";
import styles from "./TodoList.less";
import classNames from "classnames";

class TodoList extends React.Component {

    dragStart(e, sourceId) {
        e.dataTransfer.setData("sourceId", sourceId);
    }

    dragOver(e) {
        e.preventDefault();
    }

    render() {
        const { todoList, selectId, addTodo, add_1000Todos, clearAll, toggleTodo, deleteTodo, selectRow, drop } = this.props;
        const props = {
            selectId: selectId,
            toggleTodo: toggleTodo,
            deleteRow: deleteTodo,
            selectRow: selectRow,
        };
        const extend = {
            dragStart: this.dragStart,
            dragOver: this.dragOver,
            drop: drop,
        };
        return (
            <div>
                <header>
                    <Title
                        addRow={text => addTodo(text)}
                        add_1000Rows={add_1000Todos}
                        clear={clearAll}
                    />
                </header>
                <section className={styles['show-container']}>
                    <div className={styles['wrap']}>
                        <Container todoList={todoList.filter(item => item.get('isFinished') === false)} isFinished={false} {...props} {...extend} />
                        <Container todoList={todoList.filter(item => item.get('isFinished') === true)} isFinished={true} {...props} />
                    </div>
                </section>
                <footer>
                    <p onClick={clearAll}>clear all</p>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todoList: state.todoList,
        selectId: state.selectId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
        add_1000Todos: bindActionCreators(add_1000Todos, dispatch),
        clearAll: bindActionCreators(clearAll, dispatch),
        toggleTodo: bindActionCreators(toggleTodo, dispatch),
        deleteTodo: bindActionCreators(deleteTodo, dispatch),
        selectRow: bindActionCreators(selectRow, dispatch),
        drop: bindActionCreators(drop, dispatch),
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TodoList);