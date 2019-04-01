import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from './App';


describe('Should render App Component', ()=> {
  it('should render app component', ()=> {
    const component = shallow(<App />);
  })
})

describe('Should have h1 title', ()=> {
  it('Should show Random GIF fetch', ()=>{
    const component = shallow(<App/>);
  
    expect(component.find("h1.gif-title")).toHaveLength(1);
    expect(component.find("h1.gif-title").text()).toContain("Random GIF fetch")
  })
})



describe('Should handle onChange event', ()=> {
  it('should handle onChange event', ()=> {
    const component = shallow(<App/>)
    const form = component.find('input')
    // target value on App.js 
    form.props().onChange({
      target:{
        value:'Owl'
      }
    });
    expect(component.state('query')).toEqual('Owl')

  })
})