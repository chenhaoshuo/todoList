import React from "react";
import styles from './Title.less';
import { is } from 'immutable';
import UndoRedo from './UndoRedo';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const thisState = this.state;
        if (thisState.value != nextState.value) {
            return true;
        }
        return false;
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onKeyDown(e) {
        const text = this.state.value;
        if (e.keyCode == 13) {
            if (text.trim() == '') {
                alert("text不能为空！");
                return;
            }
            this.setState({ value: '' });
            this.props.addRow(text);
        }
    }

    render() {
        // console.log('title');
        const {add_1000Rows, clear} = this.props;
        return (
            <section className={styles['todoList_title']}>
                <h2>ToDoList</h2>
                <input
                    type="text"
                    placeholder="添加ToDo"
                    value={this.state.value}
                    onChange={e => this.onChange(e)}
                    onKeyDown={e => this.onKeyDown(e)}
                />
                <button onClick={add_1000Rows}>新增千条数据</button>
                <button onClick={clear}>clear All</button>
                <UndoRedo />
            </section>
        )
    }
}

export default Title;