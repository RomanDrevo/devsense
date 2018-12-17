import React, {Component} from 'react';
import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import './pictures.css'
import {Col, Row} from "react-bootstrap";

@withRouter
@inject('dataStore')
@observer
class PicturesComponent extends Component {

    render() {
        const {dataStore} = this.props
        console.log(dataStore)

        return (
            <div className="pictures-wrapper">
                <Row>
                    <Col sm={12} className="flex justify-center">
                        <div className="main-picture">
                            <img src={dataStore.mainPicture && dataStore.mainPicture}/>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {
                        dataStore.pictures.map((pic, i) => (
                            <Col sm={4} className="flex justify-center">
                                <div style={{backgroundImage: pic}} className="secondary-picture" key={i}>
                                    {/*<img src={pic}/>*/}
                                </div>
                            </Col>
                        ))
                    }
                </Row>


            </div>
        );
    }
}

export default PicturesComponent;
