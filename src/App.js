import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {inject, observer} from "mobx-react";
import {Route, Switch, withRouter} from "react-router-dom";
import {Col, Grid, Row} from "react-bootstrap";

@withRouter
@inject('testStore')
@observer
class App extends Component {

    componentDidMount() {
        const {testStore} = this.props

        console.log('testStore: ', testStore)

        testStore.getPosts()
    }

    render() {
        const {testStore} = this.props

        if (testStore.isLoading)
            return <div>Loading...</div>


        return (
            <div className="App">
                <Grid className="">
                    <Row>
                        <Col sm={12}>
                            <Switch>
                                {/*<Route exact path="/" render={() => <Home {...this.props}/>}/>*/}
                                <Route exact path="/"  />
                                {/*<Route exact path="/locations" component={Locations} />*/}
                            </Switch>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
