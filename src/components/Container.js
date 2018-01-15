import React from "react";
import ListItem from "./ListItem";
import styles from './Container.less';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.handleLiClick = this.handleLiClick.bind(this);
        this.state = {
            whichLiClick: null,
        }
    }

    handleLiClick(index) {
        this.setState({ whichLiClick: index });
    }
    
    render() {
        let doingListItems_len = 0;
        let doneListItems_len = 0;
        const doingListItems = this.props.todoList.map((todoList) => {
            const index = todoList.index;
            if (!todoList.isFinished) {
                doingListItems_len++;
                return <ListItem
                    key = {index}
                    value = {todoList}
                    onCheckboxClick = {e => this.props.onCheckboxClick(index)}
                    onRemoveClick = {e => this.props.onRemoveClick(index)}
                    onClick = {e => this.handleLiClick(index)}
                    whichLiClick = {this.state.whichLiClick}
                    onDragStart = {e => this.props.onDragStart(index, e)}
                    onDragOver = {this.props.onDragOver}
                    onDrop = {e => this.props.onDrop(index, e)}
                />
            }
        })
        const doneListItems = this.props.todoList.map((todoList) => {
            const index = todoList.index;
            if (todoList.isFinished) {
                doneListItems_len++;
                return <ListItem
                    key = {index}
                    value = {todoList}
                    onCheckboxClick = {e => this.props.onCheckboxClick(index)}
                    onRemoveClick = {e => this.props.onRemoveClick(index)}
                    onClick = {e => this.handleLiClick(index)}
                    whichLiClick = {this.state.whichLiClick}
                />
            }
        })
        return (
            <section className={styles['show-container']}>
                <div className={styles['wrap']}>
                    <div className={styles['doingList']}>
                        <div className={styles['doingList-title']}>
                            <h2>正在进行</h2>
                            <span>{doingListItems_len}</span>
                        </div>
                        <ol>{doingListItems}</ol>
                    </div>
                    <div className={styles['doneList']}>
                        <div className={styles['doneList-title']}>
                            <h2>已经完成</h2>
                            <span>{doneListItems_len}</span>
                        </div>
                        <ol>{doneListItems}</ol>
                    </div>
                </div>
            </section>
        )
    }
}

export default Container;