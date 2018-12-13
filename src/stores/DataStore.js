import {observable, action, runInAction} from "mobx";
import axios from 'axios'
import Data from "../models/Data";

export default class DataStore {
    @observable isLoading = false
    @observable data = []
    @observable isChildrenShow = false

    _url = 'http://dvns.me/yaniv/clientest/public/explorePictures'

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

    openNode = (path) =>{
        let config = {
            headers: {
                'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
            }
        }

        axios.get(`${this._url}?path=root/`, config)
            .then(res => this.data = Data.reconstituteFrom(res.data.data))

    }


    // @action
    // showChildren = () => {
    //     this.getData()
    //     this.isChildrenShow = true
    // }

}