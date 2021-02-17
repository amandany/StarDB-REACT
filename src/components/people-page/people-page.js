import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import './people-page.css';
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";


export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 9
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    
    const itemList = (
    <ItemList onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPeople}
              renderItem={({name, gender}) => `${name}, ${gender}` } />
    )

    const personDetails = (
        <ErrorBoundary>
          <PersonDetails personId={this.state.selectedPerson} />
        </ErrorBoundary>

    )

    return (
          <Row left={itemList} right={personDetails} />
    );
  }
}
