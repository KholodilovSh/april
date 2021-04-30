'use strict';

(function () {

  const overlay = document.querySelector('.overlay');
  const login = document.querySelector('.login');
  const mainHeader = document.querySelector('.main-header');
  const mainHeaderLogin = document.querySelector('.main-header__login');
  const cardButton = document.querySelector('.card__button');
  const cart = document.querySelector('.cart');
  const faqQuestions = document.querySelector('.faq__questions');
  const faqQuestionArray = document.querySelectorAll('.faq__question');
  const galleryFilter = document.querySelector('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');
  const filterButton = document.querySelector('.gallery__show-filter');
  const filterShow = document.querySelector('.gallery--js');
  const menuButton = document.querySelector('.main-header__button');
  const menuNavigation = document.querySelector('.main-header__navigation');
  const promo = document.querySelector('.promo');
  const card = document.querySelector('.card');

  let onClickMainHeaderLogin;
  let onClickCardButton;
  let onClickFilterButton;

  new window.Swiper('.image-slider', {

    pagination: {
      el: '.swiper-pagination',

      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.image-slider__next',
      prevEl: '.image-slider__previous',
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        pagination: {
          type: 'fraction',

          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
            ' of ' +
            '<span class="' + totalClass + '"></span>';
          }
        },
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2
      },
      // when window width is >= 900px
      900: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4
      }
    }
  });

  new window.Swiper('.gallery__slider', {

    pagination: {
      el: '.swiper-pagination',

      // type: 'bullet',

      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.gallery__next',
      prevEl: '.gallery__previous',
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        // pagination: {
        //   type: 'fraction',

        //   // renderFraction: function (currentClass, totalClass) {
        //   //   return '<span class="' + currentClass + '"></span>' +
        //   //   ' of ' +
        //   //   '<span class="' + totalClass + '"></span>';
        //   // }
        // },
        slidesPerView: 2,
        slidesPerColumn: 6,
        spaceBetween: 30,
        slidesPerGroup: 2
      },
      // when window width is >= 768px
      450: {
        // pagination: {
        //   type: 'bullet',
        // },

        slidesPerView: 3,
        slidesPerColumn: 4,
        spaceBetween: 30,
        slidesPerGroup: 3
      },
    }
  });

  if (mainHeader) {
    mainHeader.classList.remove('main-header--opened');
  }

  if (menuButton) {
    menuButton.classList.remove('main-header__button--opened');
  }

  if (menuButton && menuNavigation) {
    menuNavigation.classList.add('main-header__navigation--closed');

    if (promo) {
      promo.classList.remove('promo--menu');
    }

    if (card) {
      card.classList.remove('card--menu');
    }

    const onClickMenuButton = function () {

      const openMenu = menuNavigation.classList.contains('main-header__navigation--closed');

      if (openMenu) {
        menuNavigation.classList.remove('main-header__navigation--closed');
        menuButton.classList.add('main-header__button--opened');
      } else {
        menuNavigation.classList.add('main-header__navigation--closed');
        menuButton.classList.remove('main-header__button--opened');
      }

      if (mainHeader) {
        if (openMenu) {
          mainHeader.classList.add('main-header--opened');
        } else {
          mainHeader.classList.remove('main-header--opened');
        }
      }

      if (promo) {
        if (openMenu) {
          promo.classList.add('promo--menu');
        } else {
          promo.classList.remove('promo--menu');
        }
      }

      if (card) {
        if (openMenu) {
          card.classList.add('card--menu');
        } else {
          card.classList.remove('card--menu');
        }
      }
    };

    menuButton.addEventListener('click', onClickMenuButton);
  }

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

  if (filterButton && filterShow) {

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
      filterShow.classList.remove('gallery--show');
      document.body.classList.remove('body--overflow-hidden');
      galleryClose.removeEventListener('click', onClickMenuClose);
      filterShow.removeEventListener('click', onClickOverlay);

      if (overlay) {
        overlay.classList.remove('overlay--show');
        overlay.removeEventListener('click', onClickOverlay);
      }

      filterButton.addEventListener('click', onClickFilterButton);
    };

    const galleryClose = filterShow.querySelector('.gallery__close');

    onClickFilterButton = function (evtClick) {

      if (evtClick) {
        evtClick.preventDefault();
      }

      filterButton.removeEventListener('click', onClickFilterButton);

      filterShow.classList.add('gallery--show');
      document.body.classList.add('body--overflow-hidden');

      galleryClose.addEventListener('click', onClickMenuClose);
      document.addEventListener('keydown', onEscapeModalMenu);

      if (overlay) {
        overlay.classList.add('overlay--show');
        overlay.addEventListener('click', onClickOverlay);
      }
    };

    filterButton.addEventListener('click', onClickFilterButton);
  }


  if (faqQuestions && faqQuestionArray) {
    for (let i = 0; i < faqQuestionArray.length; i++) {
      faqQuestionArray[i].classList.add('faq__question--closed');
    }

    const onClickFaqQuestion = function (event) {

      const question = event.target.parentElement;
      const liClosed = question.classList.contains('faq__question--closed');
      const liOpened = question.classList.contains('faq__question--opened');

      if (liOpened || liClosed) {
        if (!liClosed) {
          question.classList.add('faq__question--closed');
          question.classList.remove('faq__question--opened');
        } else {
          question.classList.remove('faq__question--closed');
          question.classList.add('faq__question--opened');
        }
      }
    };

    faqQuestions.addEventListener('click', onClickFaqQuestion);

  }

  if (galleryFilter && galleryItems) {
    for (let i = 0; i < galleryItems.length; i++) {
      galleryItems[i].classList.add('gallery__item--closed');
    }

    const onClickGalleryFilter = function (event) {

      const filter = event.target.parentElement;
      const liClosed = filter.classList.contains('gallery__item--closed');
      const liOpened = filter.classList.contains('gallery__item--opened');

      if (liClosed || liOpened) {
        if (!liClosed) {
          filter.classList.add('gallery__item--closed');
          filter.classList.remove('gallery__item--opened');
        } else {
          filter.classList.remove('gallery__item--closed');
          filter.classList.add('gallery__item--opened');
        }
      }
    };

    galleryFilter.addEventListener('click', onClickGalleryFilter);

  }
})();
