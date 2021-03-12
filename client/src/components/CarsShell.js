import React, {Component} from "react";
import { connect } from "react-redux";
import CarCard from "./CarCard";
import {
    fetchCars
} from "../store/actions/cars";

class CarsShell extends Component {
    componentDidMount() {
        this.props.fetchCars(); // this will trigger api call and then, dispatch action creators, which will be handled by the rootReducer, to automatically update the cars state in the redux store
    }

    render(){
        //Test Data sets on the front-end
        // const cars = [
        //     {_id: "1", make: "Honda", model: "Civic", year: 2009, colour: "Silver", location_id: 4, location_description: "Downtown Vancouver - Modo Office", user: {username: "dwight"}},
        //     {_id: "2", make: "Ford", model: "New Civic", year: 2019, colour: "Navy", location_id: 7, location_description: "Burnaby - Metrotown Towers", user: {username: "dwight"}},
        //     {_id: "3", make: "Mercedez", model: "Focus", year: 2015, colour: "Black", location_id: 6, location_description: "Downtown Surrey - City Central", user: {username: "dwight"}},
        //     {_id: "4", make: "Honda", model: "Civic", year: 2009, colour: "Silver", location_id: 4, location_description: "Downtown Vancouver - Modo Office", user: {username: "dwight"}},
        //     {_id: "5", make: "Ford", model: "New Civic", year: 2019, colour: "Navy", location_id: 7, location_description: "Burnaby - Metrotown Towers", user: {username: "dwight"}},
        //     {_id: "6", make: "Mercedez", model: "Focus", year: 2015, colour: "Black", location_id: 6, location_description: "Downtown Surrey - City Central", user: {username: "dwight"}}
        // ]
        const cars = this.props.cars;

        let carsList = cars.map(car => {
            return <div key={car._id}>
                <CarCard 
                    id={car._id} 
                    make={car.make} 
                    model={car.model} 
                    year={car.year} 
                    colour={car.colour} 
                    location_description={car.location_description} 
                />
            </div>
        });

        return (
            <div className="cars-display">
                {carsList}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      cars: state.cars,
      currentUser: state.currentUser.user.id
    };
  }
  
export default connect(mapStateToProps, {
    fetchCars
})(CarsShell);
