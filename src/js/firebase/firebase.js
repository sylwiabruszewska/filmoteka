const loginModal = document.querySelector('#login-modal');
const signUpModal = document.querySelector('#signup-modal');
const userModal = document.querySelector('#user-modal');

const myAccount = document.querySelector('#my-account');
const loginFirebaseContent = document.querySelector('.login-form__modal');
const signUpFirebaseContent = document.querySelector('.signup__modal');
const userFirebaseContent = document.querySelector('.user__modal');
const signUpLink = document.querySelector('#signup__anchor');
const logInLink = document.querySelector('.login__anchor');
//modal close btns
const userModalBtnClose = document.querySelector('#user-close');
const loginModlaCloseBtn = document.querySelector('#login-close');
const signupModalCloseBtn = document.querySelector('#signup-close');

const navLogoutBtn = document.querySelector('.nav__button--logout');

myAccount.innerHTML += ' <a href="#" class="nav__link ">My account</a>';
navLogoutBtn.style.display = 'none';
myAccount.addEventListener('click', openLoginModal);



export default function openLoginModal(e) {
  if (e.target == logInLink || myAccount) {
    loginModal.style.display = 'block';
    signUpModal.style.display = 'none';
  }
}

function openSignUpModal(e) {
  e.preventDefoult;
  if (e.target == signUpLink) {
    loginModal.style.display = 'none';
    signUpModal.style.display = 'block';
    // userModal.style.display = 'none';
  }
}



signUpLink.addEventListener('click', openSignUpModal);
logInLink.addEventListener('click', openLoginModal);

signupModalCloseBtn.addEventListener('click', e => (signUpModal.style.display = 'none'));

loginModlaCloseBtn.addEventListener('click', e => (loginModal.style.display = 'none'));

userModalBtnClose.addEventListener('click', e => (userModal.style.display = 'none'));
