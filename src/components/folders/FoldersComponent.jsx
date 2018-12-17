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

    drawQuarterCircle = (nodes) => {

        const myNodes = nodes

        let createNodes = function (numNodes, radius) {
            let nodes = [],
                width = (radius * 2) + 50,
                // height = (radius * 2) + 50,
                angle,
                x,
                y,
                i;
            for (i = 0; i < numNodes; i++) {
                angle = (i / numNodes / 2) * Math.PI; // Calculate the angle at which the element will be placed.
                // For a semicircle, we would use (i / numNodes) * Math.PI.
                x = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
                y = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
                nodes.push({'id': i, 'x': x, 'y': y});
            }
            return nodes;
        }

        let createSvg = function (radius, callback) {
            d3.selectAll('svg').remove();
            let svg = d3.select('#canvas').append('svg:svg')
                .attr('width', (radius * 2) + 50)
                .attr('height', (radius * 2) + 50);
            callback(svg);
        }

        let createElements = function (svg, nodes, elementRadius) {
            let element = svg.selectAll('circle')
                .data(nodes)
                .enter().append('svg:circle')
                .attr('r', elementRadius)
                .attr('cx', function (d, i) {
                    return d.x;
                })
                .attr('cy', function (d, i) {
                    return d.y;
                });
        }

        let draw = function () {
            let numNodes = myNodes.length;
            let radius = 200;
            let nodes = createNodes(numNodes, radius);
            createSvg(radius, function (svg) {
                createElements(svg, nodes, 5);
            });
        }

        draw()

    }

    componentDidMount() {
        console.log('Node props: ', this.props)
        const {dataStore} = this.props
        this.mounted = true

        // function createFields() {
        //     $('.field').remove();
        //     var container = $('#container');
        //     for(var i = 0; i < +$('input:text').val(); i++) {
        //         $('<div/>', {
        //             'class': 'field',
        //             'text': i + 1
        //         }).appendTo(container);
        //     }
        // }
        //
        // function distributeFields() {
        //     var radius = 200;
        //     var fields = $('.field'), container = $('#container'),
        //         width = container.width(), height = container.height(),
        //         angle = 0, step = (2*Math.PI) / fields.length/2;
        //     fields.each(function() {
        //         var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        //         var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        //         if(window.console) {
        //             console.log($(this).text(), x, y);
        //         }
        //         $(this).css({
        //             left: x + 'px',
        //             top: y + 'px'
        //         });
        //         angle += step;
        //     });
        // }
        //
        //
        // createFields();
        // distributeFields();


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

                {/*<div id="container">*/}
                    {/*<div id="center" />*/}

                {/*</div>*/}



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
