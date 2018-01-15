import React from "react";
import styles from './Title.less';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    handleKeyDown(e) {
        const title = this.state.value;
        if(e.keyCode == 13){
            if(title.trim() == ''){
                alert("title不能为空！");
                return;
            }
            this.state.value = '';
            this.props.onKeyDown(title);
        }
    }

    render() {
        return (
            <header>
                <section className={styles['todoList_title']}>
                    <h2>ToDoList</h2>
                    <input 
                        type="text" 
                        placeholder="添加ToDo" 
                        value={this.state.value} 
                        onChange={e=>this.onChange(e)} 
                        onKeyDown={e=>this.handleKeyDown(e)}
                    />
                    <button onClick={this.props.onMoreDataClick}>新增千条数据</button>
                    <button onClick={this.props.onClearAllClick}>clear All</button>
                </section>
            </header>
        )
    }
}

export default Title;