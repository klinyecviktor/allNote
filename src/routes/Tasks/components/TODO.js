import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import StarRatingComponent from 'react-star-rating-component';
import {grey500} from 'material-ui/styles/colors';
import './starRating.scss'

const style = {
  card: {
    textAlign: 'left',
    width: '30.33333333%',
    display: 'inline-block',
    margin: '1.5%'
  },
  cardDone: {
    textAlign: 'left',
    width: '30.33333333%',
    display: 'inline-block',
    margin: '1.5%',
    background: grey500
  },
  iconButtons: {
    float: 'right',
    marginTop: -5
  },
  doneButton: {
    float: 'right',
    marginTop: -20

  }
}

export default class TODO extends React.Component {


  render() {
    // console.log('TODO props', this.props);
    const hours = Math.floor(this.props.neededTime / 60);
    const minutes = this.props.neededTime % 60;
    const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const editData = {
      _id: this.props._id,
      name: this.props.name,
      rewards: this.props.rewards,
      beginningDate: this.props.beginningDate,
      endDate: this.props.endDate,
      priority: this.props.priority,
      neededTime: this.props.neededTime
    }
    const doneData = {
      done: true
    };

    return (
      <Card style={this.props.done ? style.cardDone : style.card}>
        <CardHeader
          title={this.props.name} // Name
          subtitle={'Reward: ' + this.props.rewards} // Reward
        >
          <div style={style.iconButtons}>
            <IconButton
              onClick={() => this.props.toggleForm(true, editData)}
              iconClassName="material-icons">mode_edit</IconButton>
            <IconButton
              onClick={() => this.props.deleteTask(this.props._id)}
              iconClassName="material-icons">delete</IconButton>
          </div>
        </CardHeader>
        <CardText>
          Time for doing it: {time}
          <br/>
          Date of beginning: {new Date(this.props.beginningDate).toLocaleString("en-US", dateOptions)}
          <br/>
          Date of end: {new Date(this.props.endDate).toLocaleString("en-US", dateOptions)}
          <br/>
        </CardText>
        <CardTitle>Priority:
          <StarRatingComponent
            name={this.props._id}
            editing={false}
            value={this.props.priority}
          />
          {
            (this.props.done) ? '' : (<div style={style.doneButton}>
              <IconButton
                onClick={() => this.props.editTask(this.props._id, doneData)}
                iconClassName="material-icons">done</IconButton>
            </div>)
          }
        </CardTitle>
      </Card>
    );
  }
}
