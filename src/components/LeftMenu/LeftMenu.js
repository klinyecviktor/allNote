import React from 'react'
import { IndexLink, Link } from 'react-router'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import './LeftMenu.scss'

export default class LeftMenu extends React.Component {
  render() {
    return (
      <div>
        <Drawer open={this.props.open}
                docked={false}
                onRequestChange={(open, reason) => {
                  console.log(reason);
                  this.props.handle(open)
                }}>
          <IndexLink to='/'
                     activeClassName='route--active'
                     onClick={() => {this.props.handle(false)}}>
            <MenuItem>Home</MenuItem>
          </IndexLink>
          <Link to='/counter'
                activeClassName='route--active'
                onClick={() => {this.props.handle(false)}}>
            <MenuItem>Counter</MenuItem>
          </Link>
          <Link to='/tasks'
                activeClassName='route--active'
                onClick={() => {this.props.handle(false)}}>
            <MenuItem>Tasks</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}
