import React, {Component} from 'react';

const Styles = {
    width: '300px',
    height: '300px'
}

class Card extends React.Component {

    render() {

        return (

            <div>
                <h1>{this.props.slug}</h1>

                <div >
                    <img src={this.props.url}/>
                </div>

            </div>

        );

    }

}

export default Card;