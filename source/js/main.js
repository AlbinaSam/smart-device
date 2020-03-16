'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


(function () {

  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var callBackButton = document.querySelector('.main-nav__callback-button');
  var callBackPopup = document.querySelector('.callback-popup');
  var closeButton = callBackPopup.querySelector('.callback-popup__close-button');
  var callBackName = callBackPopup.querySelector('input[name=name]');
  var callBackTel = callBackPopup.querySelector('input[name=tel]');
  var callBackMessage = callBackPopup.querySelector('textarea');
  var callBackForm = callBackPopup.querySelector('form');

  var questionFormSection = document.querySelector('.question-form');
  var questionFormTel = questionFormSection.querySelector('input[name=tel]');

  var isStorageSupport = true;
  var storageName = '';
  var storageTel = '';
  var storageMessage = '';

  /*маска*/
  callBackTel.addEventListener('focus', function () {
    callBackTel.value = '+7(';
  });

  questionFormTel.addEventListener('focus', function () {
    questionFormTel.value = '+7(';
  });

  window.iMaskJS(callBackTel, {mask: '+{7}(000)000-00-00'});
  window.iMaskJS(questionFormTel, {mask: '+{7}(000)000-00-00'});

  /*плавный скролл*/
  var smoothScroll = function (element) {
    var elementPosition = element.getBoundingClientRect().top;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  };

  var linkDownButton = document.querySelector('.intro__link-down');
  var introButton = document.querySelector('.intro__button');
  var advantagesSection = document.querySelector('.advantages');

  linkDownButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    smoothScroll(advantagesSection);
  });

  introButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    smoothScroll(questionFormSection);
  });

/*открытие-закрытие попапа, localStorage, блокировка скролла*/
  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

  try {
    storageName = localStorage.getItem('callBackName');
    storageTel = localStorage.getItem('callBackTel');
    storageMessage = localStorage.getItem('callBackMessage');
  } catch (err) {
    isStorageSupport = false;
  }

  var closePopup = function () {
    overlay.classList.add('hidden');
    callBackPopup.classList.add('hidden');
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY);
    document.removeEventListener('keydown', onEscButtonPress);
  }

  var onEscButtonPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  var openPopup = function () {
    overlay.classList.remove('hidden');
    callBackPopup.classList.remove('hidden');
    body.dataset.scrollY = getBodyScrollTop();
    body.style.top = '-${body.dataset.scrollY}px';
    body.classList.add('body-lock');
    callBackName.focus();

    if (storageName) {
      callBackName.value = storageName;
    }

    if (storageTel) {
      callBackTel.value = storageTel;
    }

    if (storageMessage) {
      callBackMessage.value = storageMessage
    }

    document.addEventListener('keydown', onEscButtonPress);
  }

  callBackButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  callBackButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      openPopup();
    }
  });

  closeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      closePopup();
    }
  });

  overlay.addEventListener('click', function () {
    closePopup();
  });

  callBackForm.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('callBackName', callBackName.value);
      localStorage.setItem('callBackTel', callBackTel.value);
      localStorage.setItem('callBackMessage', callBackMessage.value);
    }
  })

  /*аккордеон */

  var siteMapButton = document.querySelector('.site-map__show-button');
  var contactsButton = document.querySelector('.footer-contacts__show-button');
  var siteMapList = document.querySelector('.site-map__nav');
  var contactsList = document.querySelector('.footer-contacts__list');
  var siteMapSection = document.querySelector('.page-footer__site-map');
  var footerContactsSection = document.querySelector('.page-footer__contacts');

  var isSiteMapListOpen = false;
  var isContactsListOpen = false;

  var onSiteMapButtonClick = function (evt) {

    if (isContactsListOpen) {
      footerContactsSection.classList.add('hidden--mobile');
      contactsButton.classList.remove('page-footer__close-button');
    }

    evt.preventDefault();
    siteMapSection.classList.toggle('hidden--mobile');
    siteMapButton.classList.toggle('page-footer__close-button');
    isSiteMapListOpen = true;
  }

  siteMapSection.classList.remove('opened--mobile');
  siteMapButton.addEventListener('click', onSiteMapButtonClick);

  var onContactsButtonClick = function (evt) {

    if (isSiteMapListOpen) {
      siteMapSection.classList.add('hidden--mobile');
      siteMapButton.classList.remove('page-footer__close-button');
    }

    evt.preventDefault();
    footerContactsSection.classList.toggle('hidden--mobile');
    contactsButton.classList.toggle('page-footer__close-button');
    isContactsListOpen = true;
  }

  footerContactsSection.classList.remove('opened--mobile');
  contactsButton.addEventListener('click', onContactsButtonClick);

}) ();
