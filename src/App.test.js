import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from './App';


describe('Should render App Component', ()=> {
  it('should render app component', ()=> {
    const component = shallow(<App />);
  })
})