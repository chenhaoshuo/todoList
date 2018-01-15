import React from "react";
import styles from "./ListItem.less";
import classNames from "classnames";

class ListItem extends React.Component {
    shouldComponentUpdate(nextProps = {}) {
        return true;
        const thisProps = this.props || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true;
        }
        if (!is(thisProps['value'], nextProps['value']) || !is(thisProps['whichLiClick'], nextProps['whichLiClick'])) {
            return true;
        }
        return false;
    }

    render() {
        // console.log('ListItem.render', this.props.value);
        const todoItem = this.props.value;
        const isClicked = todoItem.index == this.props.whichLiClick;
        const interator = {
            draggable: "true",
            onDragStart: this.props.onDragStart,
            onDragOver: this.props.onDragOver,
            onDrop: this.props.onDrop,
        }
        if (!this.props.value.isFinished) {
            return (
                <li 
                    index = {todoItem.index} 
                    className = {classNames({[styles['li-click']]: isClicked})}
                    {...interator}
                >
                    <input type="checkbox" defaultChecked={false} onClick={this.props.onCheckboxClick} />
                    <p onClick={this.props.onClick}>{todoItem.title}</p>
                    <a href="###" className={styles['remove']} onClick={this.props.onRemoveClick}><span>-</span></a>
                </li>
            )
        } else {
            return (
                <li 
                    index={todoItem.index} 
                    className={classNames({[styles['li-click']]: isClicked})}
                >
                    <input type="checkbox" defaultChecked={true} onClick={this.props.onCheckboxClick} />
                    <p onClick={this.props.onClick}>{todoItem.title}</p>
                    <a href="###" className={styles['remove']} onClick={this.props.onRemoveClick}><span>-</span></a>
                </li>
            )
        }
    }
}

export default ListItem;