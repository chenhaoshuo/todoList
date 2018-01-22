import React from "react";
import storage from "./../util/storage";
import Title from "./Title";
import Container from "./Container";
import styles from "./TodoList.less";
import classNames from "classnames";
import { fromJS, Map, List } from "immutable";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: fromJS(storage.get("todoList") || []),
            selectId: '',
        }
    }

    newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }

    addRow(text) {
        let id = this.newGuid();
        let todoList = this.state.todoList;
        const todo = Map({ text: text, id: id, isFinished: false });
        storage.add("todoList", todo);
        todoList = todoList.push(todo);
        this.setState({ todoList: todoList });
    }

    add_1000Rows() {
        console.time("新增1000条");
        let id = '';
        let todoList = this.state.todoList;
        for (let i = 0; i < 1000; i++) {
            id = this.newGuid();
            todoList = todoList.push(Map({ text: id, id: id, isFinished: false }));
        }
        storage.set("todoList", todoList);
        this.setState({ todoList: todoList });
        console.timeEnd("新增1000条");
    }

    clear() {
        if (confirm("确定要清除所有项目吗？")) {
            localStorage.removeItem("todoList_todoList");
            this.setState({ todoList: List() });
        }
    }

    finish(targetId) {
        let todoList = this.state.todoList;
        let index = todoList.findIndex(item => item.get('id') === targetId);
        let todo = todoList.get(index);
        todoList = todoList.setIn([index, 'isFinished'], !todo.get('isFinished'));
        this.setState({ todoList: todoList });
        storage.set("todoList", todoList);
    }

    deleteRow(targetId) {
        let todoList = this.state.todoList;
        let index = todoList.findIndex(item => item.get('id') === targetId);
        todoList = todoList.delete(index);
        storage.set("todoList", todoList);
        this.setState({ todoList: todoList });
    }

    selectRow(targetId) {
        if (this.state.selectId === targetId) targetId = '';
        this.setState({ selectId: targetId });
    }

    dragStart(e, sourceId) {
        e.dataTransfer.setData("sourceId", sourceId);
    }
    dragOver(e) {
        e.preventDefault();
    }
    drop(e, targetId) {
        const sourceId = e.dataTransfer.getData("sourceId");
        let todoList = this.state.todoList;
        const from = todoList.findIndex(item => item.get('id') === sourceId);
        const to = todoList.findIndex(item => item.get('id') === targetId);
        const item = todoList.get(from);
        todoList = todoList.delete(from);
        let index = from < to ? to : (to + 1);
        todoList = todoList.insert(index, item);
        storage.set("todoList", todoList);
        this.setState({ todoList: todoList });
    }

    render() {
        console.log(this.state.todoList.toJS());
        const todoList = this.state.todoList;
        const prop = {
            selectId: this.state.selectId,
            finish: e => this.finish(e),
            deleteRow: e => this.deleteRow(e),
            selectRow: e => this.selectRow(e),
        };
        const extend = {
            dragStart: (e, sourceId) => this.dragStart(e, sourceId),
            dragOver: (e) => this.dragOver(e),
            drop: (e, targetId) => this.drop(e, targetId),
        };

        return (
            <div>
                <header>
                    <Title
                        addRow={e => this.addRow(e)}
                        add_1000Rows={e => this.add_1000Rows(e)}
                        clear={e => this.clear(e)}
                    />
                </header>
                <section className={styles['show-container']}>
                    <div className={styles['wrap']}>
                        <Container todoList={todoList.filter(item => item.get('isFinished') === false)} isFinished={false} {...prop} {...extend} />
                        <Container todoList={todoList.filter(item => item.get('isFinished') === true)} isFinished={true} {...prop} />
                    </div>
                </section>
                <footer>
                    <p onClick={this.clear}>clear all</p>
                </footer>
            </div>
        )
    }
}

export default TodoList;