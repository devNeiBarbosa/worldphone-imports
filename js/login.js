function switchForm(type) {
  const loginForm = document.querySelector('.login');
  const signupForm = document.querySelector('.new-user');
  const tabs = document.querySelectorAll('.tab');
  
  if (type === 'signup') {
      loginForm.classList.remove('active');
      signupForm.classList.add('active');
      tabs[0].classList.remove('active');
      tabs[1].classList.add('active');
  } else {
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
      tabs[1].classList.remove('active');
      tabs[0].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.login').classList.add('active');
});

const password = document.getElementById('register-password');
const confirmPassword = document.getElementById('register-confirm-password');
const message = document.getElementById('password-match-message');

function validatePassword() {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
      message.classList.add('visible');
  } else {
      message.classList.remove('visible');
  }
}

password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validatePassword);