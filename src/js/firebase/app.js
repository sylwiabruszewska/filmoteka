// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth();

const fullName = document.getElementById('fullname');

const email = document.getElementById('email');
const password = document.getElementById('password');
const copassword = document.getElementById('copassword');
window.signup = function (e) {
  if (password)
    if (fullName.value == '' ||  email.value == '' || password.value == '') {
      alert('All Field Are Required');
    }
  if (password.value == copassword.value) {
  } else {
    alert('Password Confirmation is Wrong');
    return false;
  }

  e.preventDefault();
  const obj = {
    firstName: fullName.value,
    contact: contact.value,
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      // window.location.replace('login.html');
      
      // console.log(success.user.uid)
      alert('signup successfully');
    })
    .catch(function (err) {
      alert('Error in ' + err);
    });
  console.log();
  console.log(obj);
};
