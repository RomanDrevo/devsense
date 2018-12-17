import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";


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
        const {dataStore} = this.props
        // dataStore.getPicturesFromNode(dataStore.selectedNode)
        // console.log('Node props: ', this.props)
    }

    componentWillUnmount(){
        this.mounted = false
    }

    handleOnNodeClick = (e, node) => {

        e.stopPropagation()

        const {dataStore, history} = this.props

        if(node.type === 1){
            dataStore.setMainPicture(node.url)
            history.push('/picture')
        }

        if(node.type === 0){
            dataStore.getNodeChildren(this.props.myPath)
                .then((res) => {
                    if(this.mounted){
                        this.setState({myChildren: res ? res.data.data.children : []})
                    }
                })
        }


    }


    render() {
        const {dataStore, node, history} = this.props
        return (
            <ul>
                <li onClick={(e) => this.handleOnNodeClick(e, node)}
                    className={this.props.node.type === 0 ? 'folder-node' : 'picture-node'}>
                    <h4 className="pointer" onClick={this.handleOnClick}>{node.label}</h4>

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

                </li>
            </ul>
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

    render() {
        const {dataStore, history} = this.props
        return (
            <div>
                <div className="root-folder" onClick={this.handleOnClick}/>

                {
                    this.state.myChildren && this.state.myChildren.map(child => (
                        <div key={child.label}>
                            <Node
                                myPath={'root/' + child.label}
                                node={child}
                                dataStore={dataStore}
                                history={history}
                            />
                        </div>
                    ))
                }
            </div>

        )
    }
}


export default RootNode;
