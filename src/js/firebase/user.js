// code of main too
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase,
  // ref,
  // push,
  // set,
  // onValue,
  // onChildAdded,
  // get,
  // remove,
  // update,
  // onChildChanged,
  // onChildRemoved,
} from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { openLoginModal } from './firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCV47X1-JYEZkBL4tr94Sm9G9xkYXyCWos',
  authDomain: 'signup-gr3-js-goit.firebaseapp.com',
  projectId: 'signup-gr3-js-goit',
  storageBucket: 'signup-gr3-js-goit.appspot.com',
  messagingSenderId: '929171760185',
  appId: '1:929171760185:web:7f27af7125f00ce33999e8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

const firebaseBackround = document.querySelector('.firebase__modal');
const navLogoutBtn = document.querySelector('.nav__button--logout');
const userModal = document.querySelector('#user-modal');
const myAccount = document.querySelector('#my-account');
const logOutBtn = document.querySelector('#logout-btn');
const logOutBtnModaL = document.querySelector('#logout-btn__modal');

logOutBtn.addEventListener('click', logOutUser);
logOutBtnModaL.addEventListener('click', logOutUser);

function logOutUser() {
  signOut(auth)
    .then(function () {
      alert('Logout Successfully');
      const userModal = document.querySelector('#user-modal');
      userModal.style.display = 'none';
      const navLogoutBtn = document.querySelector('.nav__button--logout');
      navLogoutBtn.style.display = 'none';
      myAccount.removeEventListener('click', e => (userModal.style.display = 'block'));
      myAccount.addEventListener('click', openLoginModal);
      // userModal.style.display = 'none';
      window.location.reload(true);
    })
    .catch(function (err) {
      console.log(err);
    });
}

import openLoginModal from './firebase';

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      const uid = user.uid;
      console.log(uid);

      navLogoutBtn.style.display = 'block';
      logOutBtn.addEventListener('click', logOutUser);
      myAccount.removeEventListener('click', openLoginModal);
      myAccount.addEventListener('click', openLoggedinUserModal);
      function openLoggedinUserModal() {
        userModal.style.display = 'block';
        firebaseBackround.style.display = 'block';
      }
    } else {
      // User is signed out
      // alert('You are not logged in');
    }
  });
}
checkAuthentication();
