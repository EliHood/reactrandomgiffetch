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

describe('Should handle getGIF event', ()=> {
  it('should handle getGIF event', done => {
    const component = shallow(<App/>)
    
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockQuery = "Owl"

    const mockFetchPromise = Promise.resolve({
      json:() => mockJsonPromise,

    });
    jest.spyOn(global, 'fetch').mockImplementation(()=> mockFetchPromise);
   
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`http://api.giphy.com/v1/gifs/search?q=${mockQuery}&api_key=iBXhsCDYcnktw8n3WSJvIUQCXRqVv8AP&limit=5`);

    process.nextTick(() => { // 6
      expect(component.state()).toEqual({
        // ... assert the set state
      });

      global.fetch.mockClear(); // 7
      done(); // 8
    });

  })
})