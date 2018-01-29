import React from "react";
import ListItem from "./ListItem";
import styles from './Container.less';
import {is} from 'immutable';
import PropTypes from 'prop-types';

class Container extends React.Component {
    shouldComponentUpdate(nextProps) {
        const thisProps = this.props;
        if(!is(thisProps.todoList, nextProps.todoList) || !is(thisProps.selectId, nextProps.selectId)){
            return true;
        }
        return false;
    }

    render() {
        // console.log('container.render');
        const { todoList, toggleTodo, deleteRow, selectRow, dragStart, dragOver, drop, isFinished, selectId } = this.props;
        const items = todoList.map((item) => {
            const id = item.get('id');
            return <ListItem
                key={id}
                item={item}
                isFinished={isFinished}
                toggleTodo={e => toggleTodo(id)}
                deleteRow={e => deleteRow(id)}
                selectRow={e => selectRow(id)}
                dragStart={dragStart}
                dragOver={dragOver}
                drop={drop}
                selectId={selectId}
            />
        })
        return (
            <div className={isFinished ? styles['doneList'] : styles['doingList']}>
                <div className={styles['title']}>
                    <h2>{isFinished ? "已经完成" : "正在完成"}</h2>
                    <span>{items.size}</span>
                </div>
                <ol>{items}</ol>
            </div>
        )
    }
}

Container.propTypes = {
    isFinished: PropTypes.bool,
    selectId: PropTypes.string,
}

export default Container;