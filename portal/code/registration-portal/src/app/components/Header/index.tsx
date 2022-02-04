import React from 'react';
import { connect } from 'react-redux';
import { TodoTextInput } from '../TodoTextInput';
import { addTodo } from 'app/actions/todo';


export class Header extends React.Component {
  // const handleSave = React.useCallback(
  //   (text: string) => {
  //     if (text.length) addTodo({ text });
  //   },
  //   [addTodo]
  // );

  handleSave(){
    (text: string) => {
          if (text.length){ 
            this.props.addTodo({ text });
          }
        }
    console.log("sddddtst");
  }

  render() {
  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" />
    </header>
  );
  }
};

const mapDispatchToProps = (dispatch:any) => {
  return {
      addTodoItems: (text:any) => {
          dispatch(addTodo(text));
      }
  };
};

export default connect(mapDispatchToProps)(Header);
