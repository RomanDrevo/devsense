import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import loader from '../../assets/images/loading.svg'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
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

        const {node, dataStore} = this.props
        console.log('-mounted, I am: ', node.label)
        this.setState({myPath: this.state.myPath + '/' + node.label, isChildrenShow: false})


        // if (node.type === 0) {
        //
        // }

        // var type = 0.25, //circle type - 1 whole, 0.5 half, 0.25 quarter
        //     radius = '200px', //distance from center
        //     start = 0, //shift start from 0
        //     $elements = $('li'),
        //     numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
        //     slice = 360 * type / numberOfElements;
        //
        // console.log('$elements: ', $elements)
        //
        // $elements.each(function(i) {
        //     var $self = $(this),
        //         rotate = slice * i + start,
        //         rotateReverse = rotate * -1;
        //
        //     $self.css({
        //         'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
        //     });
        // });


    }

    handleOnFolderClick = (node) => {

        const {dataStore} = this.props

        dataStore.getNodeChildren(this.props.myPath)
            .then((res) => this.setState({myChildren: res ? res.data.data.children : []}))

        // dataStore.setSelectedNode(node, this.state.myChildren)

        // this.setState({isChildrenShow: true})

        console.log('seelcted node: ', dataStore.selectedNode)

    }

    handleOnPictureClick = () => {
        const {history} = this.props
        console.log('history: ', this.props)
        history.push('/picture')
    }

    render() {

        // console.log('Node Props: ', this.props)

        const {dataStore, node, history} = this.props
        const {children: {children}} = dataStore
        const {selectedNode} = dataStore

        // const nodes = this.state.children.map(child => {
        //     let path = this.state.path + '/' + child.label; //здесь мы считаем путь для каждого ребёнка
        //     console.log('My PATH: ', path)
        //     return <div key={child.label}><Node path={path} {...child}  node={child} dataStore={dataStore} /></div> // и создаём <Node> для каждого
        // });
        return (
            <ul>
                <li onClick={() => node.type === 0 ? this.handleOnFolderClick(node) : this.handleOnPictureClick}
                    className={this.props.node.type === 0 ? 'folder-node' : 'picture-node'}>
                    <h4 className="pointer" onClick={this.handleOnClick}>{node.label}</h4>
                    {/*{nodes}*/}

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
        // myPath: 'root',
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
