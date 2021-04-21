'use strict';

(function () {

  const overlay = document.querySelector('.overlay');
  const login = document.querySelector('.login');
  const mainHeaderLogin = document.querySelector('.main-header__login');
  const cardButton = document.querySelector('.card__button');
  const cart = document.querySelector('.cart');
  const faqQuestions = document.querySelector('.faq__questions');
  const faqQuestionArray = document.querySelectorAll('.faq__question');
  const galleryFilter = document.querySelector('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  let onClickMainHeaderLogin;
  let onClickCardButton;

  if (login && mainHeaderLogin) {

    const loginForm = login.querySelector('.login__form');
    const loginLogin = login.querySelector('.login__email input');
    const loginPass = login.querySelector('.login__text input');

    const onEscapeModalMenu = function (evt) {
      if (evt.key === 'Escape') {
        closeForm();
      }
    };

    const onClickOverlay = function () {
      closeForm();
    };

    const onClickMenuClose = function () {
      closeForm();
    };

    const onSubmitForm = function (evt) {

      if (!loginLogin.value || !loginPass.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('Login', loginLogin.value);
        }
      }
    };

    const closeForm = function () {
      login.classList.remove('login--show');
      document.body.classList.remove('body--overflow-hidden');
      loginClose.removeEventListener('click', onClickMenuClose);
      login.removeEventListener('click', onClickOverlay);
      loginForm.removeEventListener('submit', onSubmitForm);
      if (overlay) {
        overlay.classList.remove('overlay--show');
        overlay.removeEventListener('click', onClickOverlay);
      }

      mainHeaderLogin.addEventListener('click', onClickMainHeaderLogin);
    };

    let isStorageSupport = true;
    let storageLogin = '';

    try {
      storageLogin = localStorage.getItem('Login');
    } catch (err) {
      isStorageSupport = false;
    }

    const loginClose = login.querySelector('.login__close');

    onClickMainHeaderLogin = function (evtClick) {

      if (evtClick) {
        evtClick.preventDefault();
      }

      mainHeaderLogin.removeEventListener('click', onClickMainHeaderLogin);

      login.classList.add('login--show');
      document.body.classList.add('body--overflow-hidden');

      loginForm.addEventListener('submit', onSubmitForm);
      loginClose.addEventListener('click', onClickMenuClose);
      document.addEventListener('keydown', onEscapeModalMenu);

      if (overlay) {
        overlay.classList.add('overlay--show');
        overlay.addEventListener('click', onClickOverlay);
      }

      if (storageLogin) {
        loginLogin.value = storageLogin;
      }

      loginLogin.focus();
    };

    mainHeaderLogin.addEventListener('click', onClickMainHeaderLogin);
  }

  if (cart && cardButton) {

    const onEscapeModalMenu = function (evt) {
      if (evt.key === 'Escape') {
        closeForm();
      }
    };

    const onClickOverlay = function () {
      closeForm();
    };

    const onClickMenuClose = function () {
      closeForm();
    };

    const closeForm = function () {
      cart.classList.remove('cart--show');
      document.body.classList.remove('body--overflow-hidden');
      cartClose.removeEventListener('click', onClickMenuClose);
      cart.removeEventListener('click', onClickOverlay);

      if (overlay) {
        overlay.classList.remove('overlay--show');
        overlay.removeEventListener('click', onClickOverlay);
      }

      cardButton.addEventListener('click', onClickCardButton);
    };

    const cartClose = cart.querySelector('.cart__close');

    onClickCardButton = function (evtClick) {

      if (evtClick) {
        evtClick.preventDefault();
      }

      cardButton.removeEventListener('click', onClickCardButton);

      cart.classList.add('cart--show');
      document.body.classList.add('body--overflow-hidden');

      cartClose.addEventListener('click', onClickMenuClose);
      document.addEventListener('keydown', onEscapeModalMenu);

      if (overlay) {
        overlay.classList.add('overlay--show');
        overlay.addEventListener('click', onClickOverlay);
      }
    };

    cardButton.addEventListener('click', onClickCardButton);
  }

  if (faqQuestions && faqQuestionArray) {
    for (let i = 0; i < faqQuestionArray.length; i++) {
      faqQuestionArray[i].classList.add('faq__question--closed');
    }

    const onClickFaqQuestion = function (event) {

      const question = event.target.parentElement;

      if (!question.classList.contains('faq__question--closed')) {
        question.classList.add('faq__question--closed');
        question.classList.remove('faq__question--opened');
      } else {
        question.classList.remove('faq__question--closed');
        question.classList.add('faq__question--opened');
      }
    }

    faqQuestions.addEventListener('click', onClickFaqQuestion);

  }

  if (galleryFilter && galleryItems) {
    for (let i = 0; i < galleryItems.length; i++) {
      galleryItems[i].classList.add('gallery__item--closed');
    }

    const onClickGalleryFilter = function (event) {

      const filter = event.target.parentElement;

      if (!filter.classList.contains('gallery__item--closed')) {
        filter.classList.add('gallery__item--closed');
        filter.classList.remove('gallery__item--opened');
      } else {
        filter.classList.remove('gallery__item--closed');
        filter.classList.add('gallery__item--opened');
      }
    }

    galleryFilter.addEventListener('click', onClickGalleryFilter);

  }
})();
