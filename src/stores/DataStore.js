import {observable, action, runInAction} from "mobx";
import axios from 'axios'
import Data from "../models/Data";

export default class DataStore {

    @observable url = 'http://dvns.me/yaniv/clientest/public/explorePictures'
    @observable selectedNode = null
    @observable myChildren = []
    @observable loadChildrenError = null
    @observable pictures = []
    @observable mainPicture = null


    _config = {
        headers: {
            'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
        }
    }

    @action
    setMainPicture = (pic) =>{
        this.mainPicture = pic
    }

    @action
    async getNodeChildren(link) {
        console.log('here, sending ajax to: ', link)
        try {
            const response = await axios(`${this.url}?path=${link}`, this._config)
            runInAction(() => this.selectedNode = Data.reconstituteFrom(response.data.data))
            runInAction(() => this.getPicturesFromNode(this.selectedNode))
            return response
        }
        catch (e) {
            console.log('Error! ', e.message)
            runInAction(() => this.loadChildrenError = e.message);
        }
        finally {
            console.log('Pics From store ', this.pictures)
    }
    }

    @action.bound
    getPicturesFromNode = (node) => {
        if(node.type === 1){
            return
        }
        node.children.filter(child => {
            if(child.type === 1){
                console.log(child.url)
                this.pictures.push(child.url)
            }
        })

    }
}