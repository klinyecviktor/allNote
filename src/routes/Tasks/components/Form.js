import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'material-ui/Slider';
import {red500} from 'material-ui/styles/colors';

const style = {
  div: {
    textAlign: 'center'
  },
  dialog: {
    padding: '0 96px',
    textAlign: 'center',
    width: '50%',
    height: 525
  },
  dateTimeField: {
    width: '100%'
  },
  slider: {
    marginBottom: 24
  },
  errorSpan: {
    float: 'left',
    color: red500
  }

};

let DateTimeFormat = window.Intl.DateTimeFormat;

export default class Form extends React.Component {
  state = {
    name: '',
    rewards: '',
    neededTime: null,
    beginningDate: null,
    endDate: null,
    priority: 1,
    errorName: null,
    errorReward: null,
    errorTimeNeeded: null,
    errorBeginningDate: null,
    errorEndDate: null
  };

  changeFormData = this.props.changeFormData;

  handleNameField = (event) => {
    console.log('event.target.value:', event.target.value)

    this.setState({
      errorName: null,
      name: event.target.value,
    });
  };

  handleRewardsField = (event) => {
    this.setState({
      errorReward: null,
      rewards: event.target.value,
    });
  };

  handleTimeNeededField = (event, date) => {
    this.setState({
      neededTime: date,
      errorTimeNeeded: null
    });
  };

  handleBeginningDate = (event, date) => {
    this.setState({
      beginningDate: date,
      errorBeginningDate: null
    });
  };

  handleEndDate = (event, date) => {
    this.setState({
      endDate: date,
      errorEndDate: null
    });
  };

  handlePriority = (event, value) => {
    this.setState({priority: value});
  };

  handleClose = () => {
    this.props.toggleForm(false)
  };

  handleSubmit = () => {
    // Validating our form
    let data = Object.assign({}, this.state),
      error = false;

    delete data.open;

    if (data.name.length === 0) {
      this.setState({errorName: 'This field is required'})
      error = true
    }

    if (data.rewards.length === 0) {
      this.setState({errorReward: 'This field is required'})
      error = true
    }

    if (data.neededTime === null) {
      this.setState({errorTimeNeeded: 'This field is required:'})
      error = true
    }

    if (data.beginningDate === null) {
      this.setState({errorBeginningDate: 'This field is required:'})
      error = true
    }

    if (data.endDate === null) {
      this.setState({errorEndDate: 'This field is required:'})
      error = true
    }

    if (!error) {
      // dispatch action with form data
      // handle close
      data.neededTime = data.neededTime.getHours() * 60 + data.neededTime.getMinutes();


      this.state._id ? this.props.edit(this.state._id, data) : this.props.create(data);
      this.handleClose();
    }

  }

  componentWillReceiveProps = (nextProps) => {
    if (Object.keys(nextProps.formData).length) {
      let {
        neededTime,
        beginningDate,
        endDate
      } = nextProps.formData;

      let tempNeededTime = new Date();
      tempNeededTime.setHours(0);
      tempNeededTime.setMinutes(neededTime);
      neededTime = tempNeededTime;

      beginningDate = new Date(beginningDate);
      endDate = new Date(endDate);

      let timeDate = {neededTime, beginningDate, endDate};

      this.setState(Object.assign({}, nextProps.formData, timeDate));
    }
    else this.setState({
      _id: null,
      name: '',
      rewards: '',
      neededTime: null,
      beginningDate: null,
      endDate: null,
      priority: 1,
      errorName: null,
      errorReward: null,
      errorTimeNeeded: null,
      errorBeginningDate: null,
      errorEndDate: null
    })
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="Create Task"
        actions={actions}
        modal={true}
        open={this.props.open}
        autoScrollBodyContent={true}
        contentStyle={style.dialog}
      >
        <TextField
          name='name'
          fullWidth={true}
          value={this.state.name}
          errorText={this.state.errorName}
          onChange={this.handleNameField}
          floatingLabelText="Name"
        /><br/>
        <TextField
          name='reward'
          fullWidth={true}
          value={this.state.rewards}
          errorText={this.state.errorReward}
          onChange={this.handleRewardsField}
          floatingLabelText="Rewards"
        />
        <span style={style.errorSpan}>{this.state.errorTimeNeeded}</span>
        <TimePicker
          textFieldStyle={style.dateTimeField}
          format="24hr" hintText="Time needed to make the task"
          value={this.state.neededTime}
          onChange={this.handleTimeNeededField}
        />
        <span style={style.errorSpan}>{this.state.errorBeginningDate}</span>
        <DatePicker
          textFieldStyle={style.dateTimeField}
          value={this.state.beginningDate}
          onChange={this.handleBeginningDate}
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
          hintText="Date of beginning" mode="landscape"/>
        <span style={style.errorSpan}>{this.state.errorEndDate}</span>
        <DatePicker
          textFieldStyle={style.dateTimeField}
          value={this.state.endDate}
          onChange={this.handleEndDate}
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
          hintText="Date of ending" mode="landscape"/>
        <br/>
        <span>Priority: {this.state.priority}</span>
        <Slider
          min={1}
          max={5}
          step={1}
          sliderStyle={style.slider}
          value={this.state.priority}
          onChange={this.handlePriority}
        />
      </Dialog>
    );
  }
}
