'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


(function () {

  /*открытие и закрытие попапа*/
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var callBackButton = document.querySelector('.main-nav__callback-button');
  var callBackPopup = document.querySelector('.callback-popup');
  var closeButton = callBackPopup.querySelector('.callback-popup__close-button');
  var inputName = callBackPopup.querySelector('input[name=name]');
  var inputTel = callBackPopup.querySelector('input[name=tel]');
  var inputMessage = callBackPopup.querySelector('textarea');
  var callBackForm = callBackPopup.querySelector('form');

  var isStorageSupport = true;
  var storageName = '';
  var storageTel = '';
  var storageMessage = '';

  var smoothScroll = function (element) {
    var elementPosition = element.getBoundingClientRect().top;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  };
  
  var linkDownButton = document.querySelector(`.intro__link-down`);
  var advantagesSection = document.querySelector(`.advantages`);
  linkDownButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    smoothScroll(advantagesSection);
  });

  var introButton = document.querySelector(`.intro__button`);
  var questionFormSection = document.querySelector(`.question-form`);
  introButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    smoothScroll(questionFormSection);
  });



  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

  try {
    storageName = localStorage.getItem("inputName");
    storageTel = localStorage.getItem('inputTel');
    storageMessage = localStorage.getItem('inputMessage');
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
    body.style.top = `-${body.dataset.scrollY}px`;
    body.classList.add('body-lock');
    inputName.focus();

    if (storageName) {
      inputName.value = storageName;
    }

    if (storageTel) {
      inputTel.value = storageTel;
    }

    if (storageMessage) {
      inputMessage.value = storageMessage
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
      localStorage.setItem('inputName', inputName.value);
      localStorage.setItem('inputTel', inputTel.value);
      localStorage.setItem('inputMessage', inputMessage.value);
    } 
  })


  /*Маска
  window.iMaskJS(inputTel, {mask: '+{7}(000)000-00-00'});*/
  
 /*аккордеон */

 var siteMapButton = document.querySelector('.site-map__show-button');
 var contactsButton = document.querySelector('.footer-contacts__show-button');
 var siteMapList = document.querySelector('.site-map__nav');
 var contactsList = document.querySelector('.footer-contacts__list');
 
 var isSiteMapListOpen = false;
 var isContactsListOpen = false;

 var onSiteMapButtonClick = function (evt) {

   if (isContactsListOpen) {
    contactsList.classList.add('hidden');
    contactsButton.classList.remove('page-footer__close-button');
   }

  evt.preventDefault();
  siteMapList.classList.toggle('hidden');
  siteMapButton.classList.toggle('page-footer__close-button');
  isSiteMapListOpen = true;
 }

 siteMapButton.addEventListener('click', onSiteMapButtonClick);



 var onContactsButtonClick = function (evt) {

  if (isSiteMapListOpen) {
    siteMapList.classList.add('hidden');
    siteMapButton.classList.remove('page-footer__close-button');
  }
  evt.preventDefault();
  contactsList.classList.toggle('hidden');
  contactsButton.classList.toggle('page-footer__close-button');
  isContactsListOpen = true;
 }

 contactsButton.addEventListener('click', onContactsButtonClick);






}) ();