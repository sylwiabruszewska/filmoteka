const firebaseBackround = document.querySelector('.firebase__modal')

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
 firebaseBackround.style.display = 'none';
 signUpModal.style.display = 'none';
 loginModal.style.display = 'none';
 userModal.style.display = 'none';
myAccount.addEventListener('click', openLoginModal);



export default function openLoginModal(e) {
  if (e.target == logInLink || myAccount) {
    firebaseBackround.style.display = 'block';
    loginModal.style.display = 'block';
    signUpModal.style.display = 'none';
    userModal.style.display = 'none';
    window.addEventListener('keydown', closeFirebaseModalOnEsc);
  }
}

function openSignUpModal(e) {
  e.preventDefoult;
  if (e.target == signUpLink) {
    firebaseBackround.style.display = 'block';
    loginModal.style.display = 'none';
    signUpModal.style.display = 'block';
    userModal.style.display = 'none';
  }
}



signUpLink.addEventListener('click', openSignUpModal);
logInLink.addEventListener('click', openLoginModal);

signupModalCloseBtn.addEventListener('click', closeFirebaseModal);

loginModlaCloseBtn.addEventListener('click', closeFirebaseModal);

userModalBtnClose.addEventListener('click', closeFirebaseModal);

function closeFirebaseModal(e) {
  firebaseBackround.style.display = 'none';
  signUpModal.style.display = 'none';
  loginModal.style.display = 'none';
  userModal.style.display = 'none';
};

const closeFirebaseModalOnEsc = e => {
  if (e.key === 'Escape') {
    closeFirebaseModal();
    window.removeEventListener('keydown', closeFirebaseModalOnEsc);
  }
};

firebaseBackround.addEventListener('click', onOutsideClickCloseFirebaseModal);
function onOutsideClickCloseFirebaseModal(e) {
  closeFirebaseModal();
}
