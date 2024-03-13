import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgvBMf6gMcVJLRd-sNrH5jKQVbtcLl1lY',
  authDomain: 'ngcoinsdb.firebaseapp.com',
  projectId: 'ngcoinsdb',
  storageBucket: 'ngcoinsdb.appspot.com',
  messagingSenderId: '1:432636191445:web:9d8a9da9c8f2364112b85c',
  appId: 'G-CDK7E8717Z'
};

// Inicialize o Firebase com a configuração fornecida
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporte o Firestore (ou outros módulos, se necessário) para uso em outros arquivos
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage()