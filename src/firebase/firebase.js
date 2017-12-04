import * as firebase from 'firebase';
import {fbConfig} from "../config";

firebase.initializeApp(fbConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
