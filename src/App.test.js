import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from './App';


describe('Should render App Component', ()=> {
  it('should render app component', ()=> {
    const component = shallow(<App />);
  })
})

describe('Should handle onChange event', ()=> {
  it('should handle onChange event', ()=> {
    const component = shallow(<App/>)
    const form = component.find('input')

    form.props().onChange({
      target:{
        title: 'Owl',
        query: 'Owl',
        url: 'https://media.giphy.com/media/qISaMW1xwmvNS/giphy.gif'
      }
    });

    expect(component.state('query')).toEqual('Owl')

  })
})