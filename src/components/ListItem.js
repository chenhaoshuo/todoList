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
        if(!is(thisProps.selectId, nextProps.selectId) && is(thisProps.item.get('id'), nextProps.selectId)){
            return true;
        }
        if(!is(thisProps.selectId, nextProps.selectId) && is(thisProps.item.get('id'), thisProps.selectId)){
            return true;
        }
        return false;
    }

    render() {
        console.log('ListItem.render');
        const { item, finish, deleteRow, selectRow, dragStart, dragOver, drop, isFinished, selectId } = this.props;
        const id = item.get('id');
        const interator = {
            draggable: "true",
            onDragStart: (e) => dragStart(e, id),
            onDragOver: dragOver,
            onDrop: (e) => drop(e, id),
        }
        return (
            <li index={item.get('id')} className={classNames({ [styles['li-click']]: item.get('id')===selectId })} {...(isFinished ? null : interator) }>
                <input type="checkbox" defaultChecked={isFinished ? true : false} onClick={finish} />
                <p onClick={selectRow}>{item.get('text')}</p>
                <div className={styles['remove']} onClick={deleteRow}><span>-</span></div>
            </li>
        )
    }
}

export default ListItem;