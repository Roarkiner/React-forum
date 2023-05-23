import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";

const firebaseConfig: FirebaseOptions = {
    databaseURL: 'https://react-1e9aa-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)

export const database = getDatabase(app);