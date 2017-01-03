import React from 'react'
import { bindActionCreators } from 'redux'
import { Counter } from 'routes/Tasks/components/Tasks'
import { shallow } from 'enzyme'

describe('(Component) Tasks', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      counter : 5,
      ...bindActionCreators({
        tasks_doubleAsync : (_spies.tasks_doubleAsync = sinon.spy()),
        tasks_increment   : (_spies.tasks_increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Counter {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h2> that includes Sample Tasks text.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Counter:/)
  })

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    expect(_wrapper.find('h2').text()).to.match(/5$/)
    _wrapper.setProps({ counter: 8 })
    expect(_wrapper.find('h2').text()).to.match(/8$/)
  })

  it('Should render exactly two buttons.', () => {
    expect(_wrapper.find('button')).to.have.length(2)
  })

  describe('An tasks_increment button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Increment')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `tasks_increment` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.tasks_increment.should.have.been.called
    })
  })

  describe('A Double (Async) button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `tasks_doubleAsync` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.tasks_doubleAsync.should.have.been.called
    })
  })
})
