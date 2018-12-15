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
    @observable currentPath = 'root'
    @observable children = []
    @observable myChildren = []
    @observable loadChildrenError = null

    @observable isChildrenShow = false

    @action
    showChildren = () => {
        this.isChildrenShow = true
    }

    @action
    hideChildren = () =>{
        this.isChildrenShow = false
    }

    _config = {
        headers: {
            'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
        }
    }

    @action
    initRootNode = () => {
        console.log('initing..............')
        axios.get(`${this.url}?path=root/`, this._config)
            .then(res => {
                this.data = Data.reconstituteFrom(res.data.data)
                this.children = Children.reconstituteFrom(res.data.data)
                // console.log('this..children-- ', this.children)
                this.currentPath = this.data.label
                console.log('currPath: ', this.currentPath)
            })
    }

    // @action
    // async initRootNode () {
    //     console.log('initing..............')
    //     try{
    //         const res = await axios.get(`${this.url}?path=root/`, this._config)
    //
    //         runInAction(() => this.data = Data.reconstituteFrom(res.data.data))
    //         runInAction(() => this.currentPath = this.data.label)
    //         runInAction(() => this.children = Children.reconstituteFrom(res.data.data))
    //
    //             // .then(res => {
    //             //     this.data = Data.reconstituteFrom(res.data.data)
    //             //     this.children = Children.reconstituteFrom(res.data.data)
    //             //     // console.log('this..children-- ', this.children)
    //             //     this.currentPath = this.data.label
    //             //     console.log('currPath: ', this.currentPath)
    //             // })
    //     }
    //     catch (e) {
    //         console.log('Opa-opana! ', e.message)
    //         runInAction(() => this.loadChildrenError = e.message);
    //     }
    //
    // }

    @action
    async expandNode(link) {
        // console.log('here, sending ajax to: ', link)
        try {
            const response = await axios(`${this.url}?path=${link}`, this._config)
            // console.log('--+link', link)
            // const children = Children.reconstituteFrom(response.data.data)
            // console.log('--+++-------', response)
            return response
            // runInAction(() => this.myChildren = Children.reconstituteFrom(response.data.data))
        }
        catch (e) {
            console.log('Opa-opana! ', e.message)
            runInAction(() => this.loadChildrenError = e.message);
        }
        finally {
            // console.log('New children! ', this.children)
        }


        // axios(link, this._config)
        //     .then(res => this.children = res.data.data.children)
        // .then(()=> console.log('-+-children: ', this.children))
    }

    @action
    setChildren = children => {
        this.children = children
    }

    @action
    setSelectedNode = node => {
        this.selectedNode = node
    }

    @action
    setCurrentPath = (path) => {
        this.currentPath = path
        console.log('new currPath: ', this.currentPath)
    }

    @action
    setPreviousPath = (path) => {
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