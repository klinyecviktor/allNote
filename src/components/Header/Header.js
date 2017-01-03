import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import LeftMenu from '../LeftMenu'

const style = {
  position: 'fixed',
  top: 0
}

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = open => open ? this.setState({open: open}) : this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <AppBar
          title="AllNote"
          style={style}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={item => this.handleToggle()}
        />
        <LeftMenu open={this.state.open}
                  handle={this.handleToggle}/>
      </div>
    )
  }
}
