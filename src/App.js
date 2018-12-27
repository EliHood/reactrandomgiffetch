import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import {throws} from 'assert';

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
            slug: undefined,
            url: undefined
        }

        this.onChange = this
            .onChange
            .bind(this);

    }

    onChange(e) {
        this.setState({query: e.target.value})
    }

    getGIY = async(e) => {
        e.preventDefault();
        console.log(this.state)

        try {
            const {slug, url} = this.state;
            const query = this.state.query
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=iBXhsCDYcnktw8n3WSJvIUQCXRqVv8AP&limit=5`);
            const data = await response.json();
            const mainData = data.data;
            this.setState({slug: mainData[0].title, url: mainData[0].images.downsized.url});

            console.log(mainData);

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div className="col-md-6 mx-auto" style={Styles}>
                <h1>Random GIF fetch</h1>

                <form className="form-group" onSubmit={this.getGIY}>
                    <input
                        style={Styles.inputStyle}
                        className="form-control"
                        type="text"
                        name="query"
                        onChange={this.onChange}
                        ref={(input) => {
                        this.state._query = input
                    }}
                        placeholder="Search GIF..."/>
                    <button type="submit" className="btn btn-primary mt-4">Get GIF</button>

                </form>

                <Card slug={this.state.slug} url={this.state.url}/>
            </div>
        );

    }

}

export default App;
