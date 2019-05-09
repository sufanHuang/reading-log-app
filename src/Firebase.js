import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import keys from './setting/secrets.json'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    projectId: keys.projectId,
    storageBucket: keys.storageBucket,
    messagingSenderId: keys.messagingSenderId
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;