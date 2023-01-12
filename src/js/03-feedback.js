import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInp: document.querySelector('.feedback-form input[name=email]'),
  messageInp: document.querySelector('.feedback-form textarea[name=message]'),
};
const { form, emailInp, messageInp } = refs;
const userFormData = {};

// set form data from LocaleStorage
try {
  if (localStorage.getItem('feedback-form-state')?.includes('email')) {
    emailInp.value = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).email;

    userFormData.email = emailInp.value;
  }
  if (localStorage.getItem('feedback-form-state')?.includes('message')) {
    messageInp.value = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).message;

    userFormData.message = messageInp.value;
  }
} catch (error) {
  console.log(`TryCatch error name: ${error.name}`);
}

// event callbacks

function changeInput(e) {
  userFormData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(userFormData));
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log({
    email: emailInp.value,
    message: messageInp.value,
  });

  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

// events

form.addEventListener('input', throttle(changeInput, 500));
form.addEventListener('submit', onFormSubmit);
