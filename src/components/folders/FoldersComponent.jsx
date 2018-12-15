import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import loader from '../../assets/images/loading.svg'
import axios from 'axios'

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

    componentDidMount(){
        const {node, dataStore} = this.props
        console.log('-mounted, I am: ', node.label)
        // console.log('dataStore: ', dataStore.currentPath)
        this.setState({myPath: this.state.myPath + '/' + node.label})

        let config = {
            headers: {
                'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
            }
        }

        if(node.type === 0){
            dataStore.expandNode(this.props.myPath)
                .then((res) => this.setState({myChildren: res.data.data.children}))
        }

    }

    handleOnClick = () => {
        this.setState({isChildrenShow: true})
        // this.props.dataStore.showChildren()
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
                <li>
                    <h4 className="pointer" onClick={this.handleOnClick}>{node.label}</h4>
                    {/*{nodes}*/}

                    {
                        this.state.isChildrenShow ?
                            this.state.myChildren && this.state.myChildren.map(child =>(
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
class RootNode extends Component{
    render(){
        const {dataStore} = this.props
        return (
            <div className="root-folder" onClick={dataStore.initRootNode}/>
        )
    }
}



@inject('dataStore')
@observer
class FoldersComponent extends Component {

    render() {
        const {dataStore} = this.props
        const {data} = dataStore
        const {children: {children}} = dataStore
        // console.log('-+ children: ', children)

        // if (dataStore.isLoading || !dataStore.data.children)
        //     return <div><img src={loader} className="loader" alt="loading-spinner"/></div>

        return (
            <div>
                <RootNode/>

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
                                    />
                                </div>
                            ) )
                        }
                    </ul>
                }

                <div id="canvas"/>

            </div>
        );
    }

    // componentDidMount(){
    //
    //     const {dataStore} = this.props
    //
    //     const {data} = dataStore
    //
    //     let childrenAmount = data.children? data.children.length : null
    //
    //     console.log('childrenAmount: ', childrenAmount)
    //
    //     let createNodes = function (numNodes, radius) {
    //         console.log('here: ', numNodes, radius)
    //         let nodes = [],
    //             width = 50,
    //             // height = 50,
    //             angle,
    //             x,
    //             y,
    //             i;
    //         for (i=0; i<numNodes; i++) {
    //             angle = (i / (numNodes*2)) * Math.PI; // Calculate the angle at which the element will be placed.
    //                                                   // For a semicircle, we would use (i / numNodes) * Math.PI.
    //             x = (radius * Math.cos(angle)) + (width/2); // Calculate the x position of the element.
    //             y = (radius * Math.sin(angle)) + (width/2); // Calculate the y position of the element.
    //             nodes.push({'id': i, 'x': x, 'y': y});
    //         }
    //         return nodes;
    //     }
    //
    //     let createSvg = function (radius, callback) {
    //         d3.selectAll('svg').remove();
    //         let svg = d3.select('#canvas').append('svg:svg')
    //             .attr('width', 200)
    //             .attr('height', 200);
    //         callback(svg);
    //     }
    //
    //     let createElements = function (svg, nodes, elementRadius) {
    //         let element = svg.selectAll('circle')
    //             .data(nodes)
    //             .enter().append('svg:circle')
    //             .attr('r', elementRadius)
    //             .attr('cx', function (d, i) {
    //                 return d.x;
    //             })
    //             .attr('cy', function (d, i) {
    //                 return d.y;
    //             });
    //     }
    //
    //     let draw = function () {
    //         let numNodes = childrenAmount ? childrenAmount : 0;
    //         let radius = 140;
    //         let nodes = createNodes(numNodes, radius);
    //         createSvg(radius, function (svg) {
    //             createElements(svg, nodes, 5);
    //         });
    //     }
    //
    //     // $(document).ready(function() {
    //     //     draw();
    //     // });
    //     //
    //     // $("#radius, #numNodes").bind('keyup', function(e) {
    //     //     draw();
    //     // });
    //
    //     draw();
    // }
}

export default FoldersComponent;
