import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {inject, observer} from "mobx-react";
import {Route, Switch, withRouter} from "react-router-dom";
import {Col, Grid, Row} from "react-bootstrap";
import FoldersComponent from "./components/folders/FoldersComponent";

@withRouter
@inject('testStore', 'dataStore')
@observer
class App extends Component {

    componentDidMount() {
        const {dataStore} = this.props

        console.log('dataStore: ', dataStore)

        dataStore.getData()
    }

    render() {
        const {dataStore} = this.props

        if (dataStore.isLoading)
            return <div>Loading...</div>


        return (
            <div className="App">
                <Grid className="">
                    <Row>
                        <Col sm={12}>
                            <Switch>
                                {/*<Route exact path="/" render={() => <Home {...this.props}/>}/>*/}
                                <Route exact path="/home" component={FoldersComponent} />
                                <Route exact path="/picture" />
                            </Switch>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
