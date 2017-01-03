import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TODO from './TODO'
import Form from './Form'

const style = {
  div: {
    textAlign: 'center'
  },
  dialog: {
    padding: '0 96px',
    textAlign: 'center',
    width: '50%'
  },
  dateTimeField: {
    width: '100%'
  },
  slider: {
    marginBottom: 24
  }

};


export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    props.getTasks();
  }

  state = {
    open: false,
    snackbarOpen: false
  };

  handleOpen = () => {
    this.props.toggleForm(true, null)
  };


  render() {
    const listOfTodos = this.props.tasks.map(todo => {
      return (<TODO
        key={todo._id} {...todo}
        editTask={this.props.editTask}
        toggleForm={this.props.toggleForm}
        deleteTask={this.props.deleteTask}/>)
    })

    return (
      <div style={style.div}>
        <RaisedButton label="Create Task" onTouchTap={this.handleOpen} />

        <Form
          toggleForm={this.props.toggleForm}
          create={this.props.createTask}
          edit={this.props.editTask}
          formData={this.props.formData}
          changeFormData={this.props.changeFormData}
          open={this.props.openForm} />

        <Snackbar
          open={this.props.openError}
          message="An error occurred"
          autoHideDuration={4000}
          onRequestClose={this.props.closeError}
        />

        <div style={{textAlign: 'left'}}>
          {listOfTodos}
        </div>


      </div>
    );
  }
}
