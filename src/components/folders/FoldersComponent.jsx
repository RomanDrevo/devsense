import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert'

@withRouter
@inject('dataStore')
@observer
class Node extends Component {
    constructor() {
        super()
        this.state = {
            myChildren: [],
            myPath: 'root',
            isChildrenShow: false
        };
    }

    componentDidMount() {
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
    }

    handleOnNodeClick = (e, node) => {

        e.stopPropagation()

        const {dataStore, history} = this.props

        if (node.type === 1) {
            dataStore.setMainPicture(node.url)
            history.push('/picture')
        }

        if (node.type === 0) {
            dataStore.getNodeChildren(this.props.myPath)
                .then((res) => {
                    if (this.mounted) {
                        this.setState({myChildren: res ? res.data.data.children : []})
                    }
                })
        }
    }

    render() {
        const {dataStore, node, history} = this.props
        return (
            <div onClick={(e) => this.handleOnNodeClick(e, node)}
                 className={this.props.node.type === 0 ? 'folder-node' : 'picture-node'}>

                {
                    this.state.myChildren && this.state.myChildren.map(child => (
                        <div key={child.label}>
                            <Node
                                myPath={this.props.myPath + '/' + child.label}
                                node={child}
                                dataStore={dataStore}
                                history={history}
                            />
                        </div>
                    ))
                }
            </div>
        );
    }
}

@withRouter
@inject('dataStore')
@observer
class RootNode extends Component {
    state = {
        myChildren: [],
    };

    handleOnClick = () => {
        const {dataStore} = this.props
        dataStore.getNodeChildren('root')
            .then((res) => this.setState({myChildren: res ? res.data.data.children : []}))
    }

    onConfirm = () => {
        window.location.reload()
    }

    render() {
        const {dataStore, history} = this.props
        return (
            <div className="">
                <div className="root-folder" onClick={this.handleOnClick}/>

                {
                    this.state.myChildren && this.state.myChildren.map(child => (
                        <Node
                            key={child.label}
                            myPath={'root/' + child.label}
                            node={child}
                            dataStore={dataStore}
                            history={history}
                        />
                    ))
                }

                {
                    this.props.dataStore.loadChildrenError &&

                    <SweetAlert
                        warning
                        // showCancel
                        confirmBtnText="OK"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Server Error"
                        onConfirm={this.onConfirm}
                        // onCancel={this.closeAlert}
                    >
                        {
                            this.props.dataStore.loadChildrenError
                        }
                        <h4>Click "OK" button to reload the app.</h4>
                    </SweetAlert>
                }


            </div>

        )
    }
}


export default RootNode;
