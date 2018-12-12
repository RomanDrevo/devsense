import TestStore from './stores/TestStore'
import DataStore from './stores/DataStore'

const bootstrapper = () =>{
    const testStore = new TestStore()
    const dataStore = new DataStore()

    return {
        testStore, dataStore
    }
}

export default bootstrapper