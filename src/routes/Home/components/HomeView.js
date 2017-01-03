import React from 'react'
import Checkbox from 'material-ui/Checkbox';
import Study from '../assets/Rome.jpg'
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import './HomeView.scss'

const style = {
  marginBottom: 16
}

const cardStyle = {
  margin: '0 200px'
}

const imgStyle = {
  height: 300
}

export const HomeView = () => (
  <div>
    <Card style={cardStyle}>
      <CardHeader
        title="TODO List in the App"
      />
      <CardMedia>
        <img src={Study}/>
      </CardMedia>
      <CardText>
        <Checkbox
          label="Habbits"
          checked={false}
          style={style}
        />
        <Checkbox
          label="Tasks"
          checked={true}
          style={style}
        />
        <Checkbox
          label="Skills"
          checked={false}
          style={style}
        />
        <Checkbox
          label="Products and recipes"
          checked={false}
          style={style}
        />
        <Checkbox
          label="Dictionary"
          checked={false}
          style={style}
        />
        <Checkbox
          label="Knowledge"
          checked={false}
          style={style}
        />
        <Checkbox
          label="Thinking"
          checked={false}
          style={style}
        />
      </CardText>
    </Card>
  </div>
)

export default HomeView
