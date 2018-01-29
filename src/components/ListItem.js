import React from "react";
import styles from "./ListItem.less";
import classNames from "classnames";
import { is } from "immutable"

class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        const thisProps = this.props;
        if (!is(thisProps.item, nextProps.item)) {
            return true;
        }
        if (!is(thisProps.selectId, nextProps.selectId) && is(thisProps.item.get('id'), nextProps.selectId)) {
            return true;
        }
        if (!is(thisProps.selectId, nextProps.selectId) && is(thisProps.item.get('id'), thisProps.selectId)) {
            return true;
        }
        return false;
    }

    render() {
        const { item, toggleTodo, deleteRow, selectRow, dragStart, dragOver, drop, isFinished, selectId } = this.props;
        // console.log('ListItem.render' + item);
        const id = item.get('id');
        const props = {
            index: id,
            className: classNames({ [styles['li-click']]: id === selectId }),
        }
        const interator = {
            draggable: "true",
            onDragStart: (e) => dragStart(e, id),
            onDragOver: e => dragOver(e),
            onDrop: (e) => drop(e, id),
        }
        return (
            <li {...props} {...(!isFinished && interator) }>
                <input type="checkbox" defaultChecked={isFinished} onClick={e => toggleTodo(e, id)} />
                <p onClick={e => selectRow(e, id)}>{item.get('text')}</p>
                <div className={styles['remove']} onClick={e => deleteRow(e, id)}><span>-</span></div>
            </li>
        )
    }
}

export default ListItem;