import React, { Component } from 'react';
import Spinner from "../spinner";
import './item-list.css';
import SwapiService from "../../services/swapi-service";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: null
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then( (peopleList) => {
                this.setState({
                    peopleList
                });
        });
    }

    renderItem(arr){
        return(arr.map( ({id, name}) => {
            return <li className="list-group-item"
                       key={id}
                       onClick={ () => this.props.onItemSelected(id)}>
                {name}
            </li>
        }))
    }

    render() {
        const {peopleList} =this.state;

        if (!peopleList) {
            return <Spinner />;
        }

        const item = this.renderItem(peopleList);

        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}
