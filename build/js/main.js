'use strict';

(function () {

  const login = document.querySelector('.login');
  const overlay = document.querySelector('.overlay');
  const mainHeaderLogin = document.querySelector('.main-header__login');
  let onClickMainHeaderLogin;

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
  }

  const onClickMainFooterFirstParts = function () {

    const closeBlock = footerFirstParts.classList.contains('footer-multilines__parts--closed');
    toggleAccordeon(footerFirstParts, 'footer-multilines__parts', closeBlock);

    if (!footerFirstContacts.classList.contains('footer-multilines__contacts--closed')) {
      toggleAccordeon(footerFirstContacts, 'footer-multilines__contacts', false);
    }
  };

  const onClickMainFooterFirstContacts = function () {

    const closeBlock = footerFirstContacts.classList.contains('footer-multilines__contacts--closed');
    toggleAccordeon(footerFirstContacts, 'footer-multilines__contacts', closeBlock);
    if (!footerFirstParts.classList.contains('footer-multilines__parts--closed')) {
      toggleAccordeon(footerFirstParts, 'footer-multilines__parts', false);
    }
  };

  const toggleAccordeon = function (block, nameClass, closeBlock) {
    if (closeBlock) {
      block.classList.remove(nameClass + '--closed');
      block.classList.add(nameClass + '--open');
    } else {
      block.classList.remove(nameClass + '--open');
      block.classList.add(nameClass + '--closed');
    }
  };

  // if (footerFirstParts) {
  //   footerFirstParts.classList.add('footer-multilines__parts--closed');
  //   footerFirstParts.addEventListener('click', onClickMainFooterFirstParts);
  // }
  // if (footerFirstContacts) {
  //   footerFirstContacts.classList.add('footer-multilines__contacts--closed');
  //   footerFirstContacts.addEventListener('click', onClickMainFooterFirstContacts);
  // }
  if (login && mainHeaderLogin) {
    mainHeaderLogin.addEventListener('click', onClickMainHeaderLogin);
  }
})();
