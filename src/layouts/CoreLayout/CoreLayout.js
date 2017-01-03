import React from 'react'
import Header from '../../components/Header'
import '../../styles/core.scss'

const style = {
  core: {
    margin: '74px 0'
  }
}

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div style={style.core} className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
