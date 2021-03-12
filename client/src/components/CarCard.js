import React, {Component} from 'react';

export default class CarCard extends Component {
    render(){
        let {id, make, model, year, colour, location_description} = this.props;

        return (
            <div className="car-card">   
                <p>Vehicle #: {id}</p>
                <p><b>Vehicle Name: {colour} {model} {make} - {year}</b></p>
                <p>Vehicle Location: {location_description}</p>
            </div>
        );
    }
}