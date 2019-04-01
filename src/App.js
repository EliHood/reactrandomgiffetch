import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import PropTypes from "prop-types";
const Styles = {
    marginTop: '100px',
    inputStyle: {
        borderRadius: '0px',
        border: 'none',
        borderBottom: '2px solid #000',
        outline: 'none',
        focus: 'none'
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            title: undefined,
            url: undefined
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({query: e.target.value})
    }
    getGIY = async(e) => {
        e.preventDefault();
        const { query } = this.state;
        await fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=iBXhsCDYcnktw8n3WSJvIUQCXRqVv8AP&limit=5`)
        .then(response => response.json())
        .then(({ data }) => {
          this.setState({
            title: data[0].title,
            url: data[0].images.downsized.url
          });
        })
        .catch(console.log);
    }
    render() {
        return (
            <div className="col-md-6 mx-auto" style={Styles}>
                <h1 className="gif-title">Random GIF fetch</h1>
                <form className="form-group" onSubmit={this.getGIY}>
                    <input
                        style={Styles.inputStyle}
                        className="form-control"
                        type="text"
                        value={this.state.query}
                        onChange={this.onChange}
                        placeholder="Search GIF..."/>
                    <button type="submit" className="btn btn-primary mt-4">Get GIF</button>
                </form>
                <Card title={this.state.title} url={this.state.url}/>
            </div>
        );
    }
}
PropTypes.propTypes = {
    onChange: PropTypes.func.isRequired,
    getGIY:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired,
    url:PropTypes.string.isRequired
}
export default App;
