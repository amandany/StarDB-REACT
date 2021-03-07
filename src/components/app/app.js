import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from '../pages';
import {SwapiServiceProvider} from '../swapi-service-context';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './app.css';
import {StarshipDetails} from "../sw-components";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLogIn: false
    };

    onLogIn = () => {
        this.setState({
            isLogIn: true
        })
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                SwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    };

    render() {
        const {isLogIn} = this.state;
        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>
                            <Switch>
                                <Route path="/" render={
                                    () => <h2>Welcome to StarDB!</h2>}
                                       exact
                                />
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetsPage}/>
                                <Route path="/starships" component={StarshipsPage} exact/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }}/>
                                <Route path="/login" component={() => <LoginPage
                                    isLogIn={isLogIn}
                                    onLogIn={this.onLogIn}
                                />}/>
                                <Route path="/secret" component={() => <SecretPage
                                    isLogIn={isLogIn}
                                />}/>
                                <Route render={() => <h3>PAGE NOT FOUND</h3>}/>

                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}
