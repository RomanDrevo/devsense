import React, {Component} from 'react';
import './folders.css'
import {inject, observer} from "mobx-react/index";
import loader from '../../assets/images/loading.svg'


@inject('dataStore')
@observer
class Node extends Component{

    render(){
        const {node, dataStore} = this.props
        return <li><div
            onClick={(node)=> dataStore.openNode(node)}
            className="child-folder" />{node.label}</li>
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
        console.log('-+ data: ', data)

        // if (dataStore.isLoading || !dataStore.data.children)
        //     return <div><img src={loader} className="loader" alt="loading-spinner"/></div>

        return (
            <div>
                {/*Folders*/}
                <div className="root-folder" onClick={dataStore.openNode}/>

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

                <div id="canvas" />

            </div>
        );
    }
}

export default FoldersComponent;
