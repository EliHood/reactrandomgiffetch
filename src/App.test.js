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

describe('Should handle getGIF event', () => {

  let mock, actualFetch;
  beforeEach(() => {
    mock = jest.fn();
    actualFetch = global.fetch;
    global.fetch = mock;
  });
  afterEach(() => {
    global.fetch = actualFetch;
  });

  it('should handle getGIF event', async () => {
    const component = shallow(<App />);
    const instance = component.instance();
    component.setState({ query: 'Owl' });
    mock.mockResolvedValue({ 
      json: () => Promise.resolve({
        data: [{
          title: 'the title',
          images: { downsized: { url: 'the url' }}
        }]
      })
    });

    await instance.getGIY({ preventDefault: () => {} });

    expect(mock).toHaveBeenCalledWith('http://api.giphy.com/v1/gifs/search?q=Owl&api_key=iBXhsCDYcnktw8n3WSJvIUQCXRqVv8AP&limit=5');  // Success!
    expect(component.state('title')).toBe('the title');  // Success!
    expect(component.state('url')).toBe('the url');  // Success!
  });
});