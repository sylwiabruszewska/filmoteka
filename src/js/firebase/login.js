
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
 const loginModal = document.querySelector('#login-modal');

 const userModal = document.querySelector('#user-modal');
 const navLogoutBtn = document.querySelector('.nav__button--logout');
const logInForm = document.querySelector('#login-form');
logInForm.addEventListener('submit', onLoginFormSubmit);

function onLoginFormSubmit(e) {
  e.preventDefault();
  const loginData = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  // myAccount.innerHTML = '';
  signInWithEmailAndPassword(auth, loginData.email, loginData.password)
    .then(function (success) {
     
      alert('logined Successfully');
      const userIdNumber = success.user.uid;
      localStorage.setItem('uid', userIdNumber);
      console.log(userIdNumber);

      
      userModal.style.display = 'block';
      loginModal.style.display = 'none';
      navLogoutBtn.style.display = 'block';
      // localStorage.setItem(success,user,uid)
    })
    .catch(function (err) {
      alert('login error' + err);
    });


  console.log(loginData);
}
