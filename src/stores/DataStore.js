import {observable, action, runInAction} from "mobx";
import axios from 'axios'
import Data from "../models/Data";
import Children from "../models/Children";

export default class DataStore {

    @observable url = 'http://dvns.me/yaniv/clientest/public/explorePictures'
    @observable selectedNode = null
    @observable myChildren = []
    @observable loadChildrenError = null

    _config = {
        headers: {
            'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
        }
    }

    @action
    async getNodeChildren(link) {
        console.log('here, sending ajax to: ', link)
        try {
            const response = await axios(`${this.url}?path=${link}`, this._config)
            // console.log('--+link', link)
            // const children = Children.reconstituteFrom(response.data.data)
            // console.log('--+++-------', response)
            runInAction(() => this.selectedNode = Data.reconstituteFrom(response.data.data))
            return response
        }
        catch (e) {
            console.log('Opa-opana! ', e.message)
            runInAction(() => this.loadChildrenError = e.message);
        }
        finally {
            console.log('Selected Node From store ', this.selectedNode)
        }

    }



    // @action
    // setSelectedNode = (node, children) => {
    //     // console.log(node, children)
    //     this.selectedNode = node
    //     this.selectedNode.children = children
    // }
}