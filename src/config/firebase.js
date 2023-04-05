// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB_BrGDQ-D87JwnZaMflkc6rRfDVtzsvkc',
    authDomain: 'lofi-react-app.firebaseapp.com',
    projectId: 'lofi-react-app',
    storageBucket: 'lofi-react-app.appspot.com',
    messagingSenderId: '232855401203',
    appId: '1:232855401203:web:d8d274609a2eabe610fd86',
    measurementId: 'G-VCFN8X9VWT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const projectsFirestore = getFirestore()
export const firebaseAuth = getAuth(app)
export const analytics = getAnalytics(app)
export const storage = getStorage()
