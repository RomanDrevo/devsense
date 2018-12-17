import DataStore from './stores/DataStore'

const bootstrapper = () =>{
    const dataStore = new DataStore()

    return {
        dataStore
    }
}

export default bootstrapper