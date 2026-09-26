document.querySelectorAll('[data-unwired-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.form-note').hidden = false;
  });
});
