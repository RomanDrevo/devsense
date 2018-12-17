import React, { Component } from 'react';
import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";


@withRouter
@inject('dataStore')
@observer
class PicturesComponent extends Component {

  render() {
      const {dataStore} = this.props

    return (
        <div>
            Pictures
      </div>
    );
  }
}

export default PicturesComponent;
