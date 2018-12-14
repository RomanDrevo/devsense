import {observable, action, runInAction} from "mobx";
import axios from 'axios'
import Data from "../models/Data";
import Children from "../models/Children";

export default class DataStore {
    @observable isLoading = false
    @observable data = []
    @observable isChildrenShow = false

    @observable url = 'http://dvns.me/yaniv/clientest/public/explorePictures'

    @observable selectedNode = null
    @observable previousPath = ''
    @observable currentPath = ''
    @observable children = []
    _config = {
        headers: {
            'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
        }
    }

    initRootNode = () => {


        axios.get(`${this.url}?path=root/`, this._config)
            .then(res => {
                this.data = Data.reconstituteFrom(res.data.data)
                this.children = this.data.children
                this.currentPath = this.data.label
            })

    }

    @action
    async expandNode (link) {
        try{
            const response = await axios(link, this._config)
            // console.log('--+++----response', response)
            // const children = Children.reconstituteFrom(response.data.data)
            // console.log('--+++-----------------', children)
            runInAction(() => this.children = Children.reconstituteFrom(response.data.data))
        }
        catch (e) {
            console.log('Opa-opana! ', e)
        }
        finally {
            console.log('New children! ', this.children)
        }


        // axios(link, this._config)
        //     .then(res => this.children = res.data.data.children)
            // .then(()=> console.log('-+-children: ', this.children))
    }

    @action
    setChildren = children =>{
        this.children = children
    }

    @action
    setSelectedNode = node =>{
        this.selectedNode = node
    }

    @action
    setCurrentPath = (path) =>{
        this.currentPath = path
        console.log('new currPath: ', this.currentPath )
    }

    @action
    setPreviousPath = (path) =>{
        this.previousPath = path
    }

    // @action
    // async getData() {
    //     this.isLoading = true
    //     try {
    //         let config = {
    //             headers: {
    //                 'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
    //             }
    //         }
    //
    //
    //         const data = await axios.get('http://dvns.me/yaniv/clientest/public/explorePictures?path=root/folder0/folder0_0/folder0_0_2', config)
    //         // const data = await axios.get(`${this._url}?path=root/`, config)
    //         console.log('---data: ', data.data)
    //
    //         runInAction(() => this.data = Data.reconstituteFrom(data.data.data))
    //
    //         this.data.children.map(node => this._checkNodType(node))
    //     }
    //     catch (e) {
    //         console.log(e.response.statusText)
    //     }
    //     finally {
    //         this.isLoading = false
    //         console.log('this.data: ', this.data)
    //     }
    // }

    _checkNodType = (node) => {
        if (node.type === 0) {
            console.log('this is folder')
        } else {
            console.log('this is picture')
        }
    }

    // @action
    // async openNode (){
    //
    //     this.isLoading = true
    //     try {
    //         let config = {
    //             headers: {
    //                 'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
    //             }
    //         }
    //
    //
    //         // const data = await axios.get('http://dvns.me/yaniv/clientest/public/explorePictures?path=root/folder0/folder0_0/folder0_0_2', config)
    //         const data = await axios.get(`${this._url}?path=root/`, config)
    //         console.log('---data: ', data.data)
    //
    //         runInAction(() => this.data = Data.reconstituteFrom(data.data.data))
    //
    //         this.data.children.map(node => this._checkNodType(node))
    //     }
    //     catch (e) {
    //         console.log(e.response.statusText)
    //     }
    //     finally {
    //         this.isLoading = false
    //         console.log('this.data: ', this.data)
    //     }
    //     // if(node.type === 0){
    //     //     console.log('this is folder')
    //     //
    //     // }else {
    //     //     console.log('this is picture')
    //     // }
    // }




    // @action
    // showChildren = () => {
    //     this.getData()
    //     this.isChildrenShow = true
    // }

}