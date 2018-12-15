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

        const {node, dataStore} = this.props
        console.log('-mounted, I am: ', node.label)
        // console.log('dataStore: ', dataStore.currentPath)
        this.setState({myPath: this.state.myPath + '/' + node.label, isChildrenShow: false})

        let config = {
            headers: {
                'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
            }
        }

        if (node.type === 0) {
            dataStore.expandNode(this.props.myPath)
                .then((res) => this.setState({myChildren: res ? res.data.data.children : []}))
        }

    }

    handleOnFolderClick = () => {

        this.setState({isChildrenShow: true})

    }

    handleOnPictureClick = () => {
        const {history} = this.props
        console.log('history: ', this.props)
        // history.push('/picture')
    }

    render() {

        // console.log('Node Props: ', this.props)

        const {dataStore, node} = this.props
        const {children: {children}} = dataStore

        // const nodes = this.state.children.map(child => {
        //     let path = this.state.path + '/' + child.label; //здесь мы считаем путь для каждого ребёнка
        //     console.log('My PATH: ', path)
        //     return <div key={child.label}><Node path={path} {...child}  node={child} dataStore={dataStore} /></div> // и создаём <Node> для каждого
        // });
        return (
            <ul>
                <li onClick={node.type === 0 ? this.handleOnFolderClick : this.handleOnPictureClick}
                    className={this.props.node.type === 0 ? 'folder-node' : 'picture-node'}>
                    <h4 className="pointer" onClick={this.handleOnClick}>{node.label}</h4>
                    {/*{nodes}*/}

                    {
                        this.state.isChildrenShow ?
                            this.state.myChildren && this.state.myChildren.map(child => (
                                <div key={child.label}>
                                    <Node
                                        myPath={this.props.myPath + '/' + child.label}
                                        node={child}
                                        dataStore={dataStore}
                                    />
                                </div>
                            ))
                            :
                            null
                    }


                    {/*{*/}
                    {/*this.state.children && this.state.children.map(child =>*/}
                    {/*// let path = this.state.path + '/' + child.label;*/}
                    {/*<div key={child.label}>*/}
                    {/*<Node*/}
                    {/*path={this.state.path + '/' + child.label}*/}
                    {/*node={child}*/}
                    {/*dataStore={dataStore}*/}
                    {/*/>*/}
                    {/*</div>)*/}
                    {/*}*/}


                </li>
            </ul>
        );
    }
}


@inject('dataStore')
@observer
class RootNode extends Component {
    render() {
        const {dataStore} = this.props
        return (
            <div className="root-folder" onClick={dataStore.initRootNode}/>
        )
    }
}

@withRouter
@inject('dataStore')
@observer
class FoldersComponent extends Component {

    componentDidMount() {

    }

    onConfirm = () => {
        window.location.reload()
    }

    render() {
        const {dataStore, history} = this.props
        const {data} = dataStore
        const {children: {children}} = dataStore
        // console.log('-+ children: ', children)

        // if (dataStore.isLoading || !dataStore.data.children)
        //     return <div><img src={loader} className="loader" alt="loading-spinner"/></div>


        return (
            <div>
                <RootNode/>

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


                {
                    children && children.length &&
                    <ul>
                        {
                            children.map((x) => (
                                <div key={x.label}>
                                    <Node
                                        node={x}
                                        dataStore={dataStore}
                                        myPath={'root/' + x.label}
                                        history={history}
                                    />
                                </div>
                            ))
                        }
                    </ul>
                }

                <div id="canvas"/>

            </div>
        );
    }
}

export default FoldersComponent;
