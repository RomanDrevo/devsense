import {observable, action, runInAction} from "mobx";
import axios from 'axios'
import Data from "../models/Data";

export default class DataStore{
    @observable isLoading = false
    @observable data = []

    @action
    async getData(){
        this.isLoading = true
        try {
            let config = {
                headers: {
                    'X-TOKEN': '2d4e69f4823176197ccf41caa5ee6456',
                }
            }


            const data = await axios.get('http://dvns.me/yaniv/clientest/public/explorePictures', config)
            // console.log('---data: ', data.data)

            runInAction(()=> this.data = Data.reconstituteFrom(data.data.data))
        }
        catch (e) {
            console.log({e})
        }
        finally {
            this.isLoading = false
        }
    }

}