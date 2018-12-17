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
                        <div style={{backgroundImage: `url(${dataStore.mainPicture})`}} className="main-picture" />
                        {/*<img src={dataStore.mainPicture && dataStore.mainPicture}/>*/}
                    </Col>
                </Row>

                <Row>
                    {
                        dataStore.pictures.map((pic, i) => (
                            <Col key={i} sm={4} className="flex justify-center items-center">
                                <div
                                    onClick={()=> dataStore.setMainPicture(pic)}
                                    style={{backgroundImage: `url(${pic})`}}
                                    className="secondary-picture"
                                />
                            </Col>
                        ))
                    }
                </Row>


            </div>
        );
    }
}

export default PicturesComponent;
