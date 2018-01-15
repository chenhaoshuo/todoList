import React from "react";
import Util from "./../util/Util";
import Title from "./Title";
import Container from "./Container";
import styles from "./TodoList.less";
import classNames from "classnames";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: Util.StorageGetter("todoList") || [],
            totalThings: Util.StorageGetter("totalThings") || 0,
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMoreDataClick = this.handleMoreDataClick.bind(this);
        this.handleClearAllClick = this.handleClearAllClick.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        //拖拽
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleKeyDown(title) {
        let index = this.state.totalThings;
        const todoItem = { title: title, index: index, isFinished: false };
        Util.StorageSetter("totalThings", index++);
        Util.StorageAdder("todoList", todoItem);
        const todoList = [...this.state.todoList, todoItem]
        this.setState({
            todoList: todoList,
            totalThings: index,
        });
    }

    handleMoreDataClick() {
        console.time("新增1000条");
        let index = this.state.totalThings;
        let arr = [];
        for (let i = 0; i < 1000; i++) {
            arr.push({ title: index, index: index++, isFinished: false });
        }
        let todoList = this.state.todoList;
        todoList.push(...arr);
        Util.StorageSetter("todoList", todoList);
        Util.StorageSetter("totalThings", index);
        this.setState({
            todoList: todoList,
        });
        console.timeEnd("新增1000条");
    }

    handleClearAllClick() {
        if (confirm("确定要清除所有项目吗？")) {
            localStorage.removeItem("todoList_todoList");
            localStorage.removeItem("todoList_totalThings");
        }
        this.setState({
            todoList: [],
            totalThings: 0,
        });
    }

    handleCheckboxClick(targetIndex) {
        let todoList = this.state.todoList;
        todoList.forEach((todoItem) => {
            if (todoItem.index == targetIndex) {
                todoItem.isFinished = !todoItem.isFinished;
                return;
            }
        });
        Util.StorageSetter("todoList", todoList);
        this.setState({
            todoList: todoList,
        });
    }

    handleRemoveClick(targetIndex) {
        let todoList = this.state.todoList;
        todoList.forEach((todoItem, index, todoList) => {
            if (todoItem.index == targetIndex) {
                todoList.splice(index, 1);
                Util.StorageDeleter("todoList", targetIndex);
                return;
            }
        });
        this.setState({
            todoList: todoList,
        });
        // TODO:　动画
        // element.className = classNames({[styles['linear-out']]: true});
        // setTimeout(() => this.setState({
        //     todoList: Util.StorageGetter("todoList"),
        // }), 200);
    }
    
    handleDragStart(sourceIndex, e) {
        e.dataTransfer.setData("sourceIndex", sourceIndex);
    }
    handleDragOver(e) {
        e.preventDefault();
    }
    handleDrop(targetIndex, e) {
        const sourceIndex = e.dataTransfer.getData("sourceIndex");
        const movingItem = Util.StorageDeleter("todoList", sourceIndex);
        let todoList = Util.StorageGetter("todoList");
        for(let [index, thing] of todoList.entries()){
			if(thing.index == targetIndex){
				todoList.splice(index+1, 0, movingItem);
				break;
			}
        }
        Util.StorageSetter("todoList", todoList);
        this.setState({
            todoList: todoList,
        });
    }

    render() {
        return (
            <div>
                <Title
                    onKeyDown = {this.handleKeyDown}
                    onMoreDataClick = {this.handleMoreDataClick}
                    onClearAllClick = {this.handleClearAllClick}
                />
                <Container
                    todoList = {this.state.todoList}
                    onCheckboxClick = {this.handleCheckboxClick}
                    onRemoveClick = {this.handleRemoveClick}
                    onDragStart = {this.handleDragStart}
                    onDragOver = {this.handleDragOver}
                    onDrop = {this.handleDrop}
                />
                <footer>
                    <a href="###" onClick={this.handleClearAllClick}>clear all</a>
                </footer>
            </div>
        )
    }
}

export default TodoList;