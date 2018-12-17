import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {inject, observer} from "mobx-react";
import {Route, Switch, withRouter} from "react-router-dom";
import {Button, Col, Grid, Row} from "react-bootstrap";
import RootNode from "./components/folders/FoldersComponent";
import loader from './assets/images/loading.svg'
import PicturesComponent from "./components/pictures/PicturesComponent";

@withRouter
@inject('dataStore')
@observer
class App extends Component {

    componentDidMount() {
        const {dataStore} = this.props

        // console.log('dataStore: ', dataStore)

        // dataStore.openNode()
    }

    render() {
        const {history} = this.props

        // if (dataStore.isLoading)
        //     return <div><img src={loader} className="loader" alt="loading-spinner"/></div>


        return (
            <div className="App">
                <Grid className="">
                    <Row className="mt-5">
                        <Col sm={12}>
                            <Button className="mr-1" onClick={()=>history.push('home')}>Home</Button>
                            <Button className="ml-1" onClick={()=>history.push('picture')}>Pictures</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Switch>
                                {/*<Route exact path="/" render={() => <Home {...this.props}/>}/>*/}
                                <Route exact path="/home" component={RootNode} />
                                <Route exact path="/picture" component={PicturesComponent} />

                            </Switch>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
