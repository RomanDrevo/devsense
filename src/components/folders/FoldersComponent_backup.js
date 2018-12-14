import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import loader from '../../assets/images/loading.svg'
import axios from 'axios'

@inject('dataStore')
@observer
// class Node extends Component {
//
//     state = {
//         isRoot: true,
//         path: 'root',
//         children: []
//     }
//
//     handleOnClick = () => {
//         // api call
//         // put children to state children
//     }
//
//     drawFolderNode = () => {
//         const {node, dataStore} = this.props
//         console.log('here1')
//         return (
//             <ul>
//                 <li>
//
//                     <div
//                         // onClick={(node) => dataStore.openNode(`${node.label}`)}
//                         // onClick={(node) => dataStore.openNode(`${node.label}`)}
//                         className="child-folder"/>
//                     {/*{node.label}*/}
//                 </li>
//             </ul>
//         )
//     }
//
//     render() {
//         const {node, dataStore} = this.props
//         return (
//             <li>
//                 <div
//                     // onClick={() => console.log('here')}
//                     className="child-folder"
//                 />
//                 {node.label}
//             </li>
//         )
//     }
// }

class Node extends Component {
    constructor() {
        super()
        this.state = {
            children: [],
            url: 'http://dvns.me/yaniv/clientest/public/explorePictures',
            path: ''
        };
    }

    componentDidMount(){
        console.log('-children: ', this.state.children)
    }

    handleOnClick = () => {
        let config = {
            headers: {
                'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
            }
        }
        const {node}  = this.props
        console.log(`${this.state.url}?path=root/${node.label}`)
        axios.get(`${this.state.url}?path=root/${node.label}`, config).then(response => {
            console.log('response: ', response.data.data.children)
            this.setState({children: response.data.data.children});
            // console.log('++STATE: ', this.state)
        });
    }

    render() {
        const nodes = this.state.children.map((child, index) => {
            let path = this.props.path + '/' + child.label; //здесь мы считаем путь для каждого ребёнка
            return <Node key={index} {...child} node={child} path={path} /> // и создаём <Node> для каждого
        });
        // console.log('---nodes: ', nodes)
        // console.log('---STATE: ', this.state)
        return (
            <ul>
                <li onClick={this.handleOnClick}>{this.props.node.label}---{nodes}</li>
            </ul>
        );
    }
}


@inject('dataStore')
@observer
class FoldersComponent extends Component {

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


    render() {
        const {dataStore} = this.props
        const {data} = dataStore
        // console.log('-+ data: ', data)

        // if (dataStore.isLoading || !dataStore.data.children)
        //     return <div><img src={loader} className="loader" alt="loading-spinner"/></div>

        return (
            <div>
                <div className="root-folder" onClick={() => dataStore.openNode('root/')}/>



                {/*{*/}
                {/*dataStore.isChildrenShow &&*/}
                {/*<ul>*/}
                {/*{*/}
                {/*data.children.map((x, index) => <li key={index}><div*/}
                {/*// onClick={()=> dataStore.openNode(x)}*/}
                {/*className="child-folder" />{x.label}</li>)*/}
                {/*}*/}
                {/*</ul>*/}
                {/*}*/}

                {
                    dataStore.data && dataStore.data.children && dataStore.data.children.length &&
                    <ul>
                        {
                            data.children.map((x, index) => <Node key={index} node={x}/>)
                        }
                    </ul>
                }

                <div id="canvas"/>

            </div>
        );
    }
}

export default FoldersComponent;
