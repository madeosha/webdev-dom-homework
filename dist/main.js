/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchAndRenderComments: () => (/* binding */ fetchAndRenderComments),\n/* harmony export */   getToken: () => (/* binding */ getToken),\n/* harmony export */   loginUser: () => (/* binding */ loginUser),\n/* harmony export */   postComment: () => (/* binding */ postComment),\n/* harmony export */   regUser: () => (/* binding */ regUser),\n/* harmony export */   setToken: () => (/* binding */ setToken)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\n// Импорт данных из модулей\r\n\r\n\r\n\r\n\r\n// Адерес сервера\r\nconst hostV1 = 'https://wedev-api.sky.pro/api';\r\nconst hostV2 = 'https://wedev-api.sky.pro/api/v2/elena-kozlova/comments'; \r\n\r\nlet token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';\r\n\r\ntoken = null;\r\n\r\n// Функция позволяющая изменять переменную токен в других модулях приложения\r\nconst setToken = (newToken) => {\r\n  token = newToken;\r\n};\r\n\r\nconst getToken = ( ) => {\r\n  return token\r\n}; \r\n\r\n//Функция входа по логину \r\nconst loginUser = (login, password) => {\r\n  return fetch(\r\n    `${hostV1}/user/login`,\r\n    {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password\r\n    })\r\n  }).then((response) => {\r\n    return response.json()\r\n  }) \r\n}\r\n\r\n// Функция регистрации юзера\r\nconst regUser = (login, password, name) => {\r\n  return fetch(\r\n    `${hostV1}/user`,\r\n    {\r\n      method: \"POST\",\r\n      body: JSON.stringify({\r\n        login,\r\n        password,\r\n        name,\r\n      })\r\n    }\r\n  ).then((response) => {\r\n    return response.json()\r\n  })\r\n}\r\n\r\n// Получение данные из API\r\nconst fetchAndRenderComments = () => {\r\n  const headers = token ? { Authorization: `Bearer ${token}`, } : {};\r\n    return fetch(\r\n      hostV2, \r\n      {\r\n        method: \"GET\",\r\n        headers,\r\n      })\r\n    .then((response) => {\r\n      return convertServer(response, _main_js__WEBPACK_IMPORTED_MODULE_0__.comments)\r\n    })\r\n  }\r\n\r\n  const convertServer = (response, comments) => {\r\n    return response.json().then((responseData) => {\r\n      comments = responseData.comments;\r\n      comments = comments.map((comment) => {\r\n        return {\r\n          id:0,\r\n          name: comment.author.name,\r\n          date: (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatComment)(comment.date),\r\n          textComment: comment.text,\r\n          likes: comment.likes,\r\n          isActiveLike: false,\r\n          isEdit: false\r\n        }\r\n      });\r\n      (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)(comments);\r\n    })\r\n  }\r\n    \r\n// Фукнция поторного вызова в случае ошибки от сервера\r\nconst postComment = () => {\r\n\r\n  // Защащаем ввод данных\r\n  const protectionHtml = (string) => {\r\n    return string\r\n      .replaceAll(\"&\", \"&amp;\")\r\n      .replaceAll(\"<\", \"&lt;\")\r\n      .replaceAll(\">\", \"&gt;\")\r\n      .replaceAll('\"', \"&quot;\")\r\n  };\r\n\r\n  // Добавляем новый комментарий в API\r\n  const elementComment = document.getElementById('commentInput');\r\n  const elementName = document.getElementById('nameInput');\r\n    return fetch(\r\n      hostV2, \r\n      {\r\n      method: 'POST',\r\n      headers: {\r\n        Authorization: `Bearer ${token}`,\r\n      },\r\n      body: JSON.stringify(\r\n        {\r\n        text: protectionHtml(elementComment.value),\r\n        name: protectionHtml(elementName.value),\r\n        forceError: false,\r\n      }),\r\n    })\r\n      .then((response) => {\r\n        if (response.status === 201) {\r\n          elementName.classList.remove('error');\r\n          elementComment.classList.remove('error');\r\n          return response.json();\r\n        } else if (response.status === 400) {\r\n          throw new Error(\"Плохой запрос\")\r\n//        } else if (response.status === 401) {\r\n//          throw new Error(\"Нет авторизации\")\r\n        } else if (response.status === 500) {\r\n          throw new Error(\"Ошибка сервера\")\r\n        } else {\r\n          throw new Error(\"У пользователя пропал интернет\");\r\n        }\r\n      })\r\n      .then(() => {\r\n        elementName.value = '';\r\n        elementComment.value = '';\r\n//        buttonElement.disabled = true;\r\n        fetchAndRenderComments();\r\n      })\r\n      .catch((error) => {\r\n//        loadingCommentElement.style.display = 'none';\r\n//        addFormElement.style.display = 'flex';\r\n       if (error.message === \"Плохой запрос\") {\r\n          elementComment.classList.add('error');\r\n          elementName.classList.add('error');\r\n          alert('Вы ввели слишком короткое имя или текст комментария')\r\n//        } else if (error.message === \"Нет авторизации\") {\r\n//          alert('Пожалуйста, зарегистрируйтесь')\r\n        } else if (error.message === \"Ошибка сервера\") {\r\n          alert(\"Сервер сломался\");\r\n//          postComment(comments);\r\n       } else {\r\n          alert(\"Кажется, что-то пошло не так, попробуйте позже\");\r\n          postComment();\r\n          fetchAndRenderComments();          \r\n        }\r\n      })\r\n};\r\n\n\n//# sourceURL=webpack://yes/./api.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DateFormatComment: () => (/* binding */ DateFormatComment),\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   isPosting: () => (/* binding */ isPosting)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\r\n// Импорт данных из модулей\r\n\r\n\r\n//  Массив в который будем рендерить полученные данные\r\nlet comments = [];\r\n\r\nlet isPosting = false;\r\n\r\n// Функция обработчика даты\r\nconst DateFormatComment = (commentDate) => {\r\n  const dateComment = new Date(commentDate);\r\n  const formatDate = dateComment.getDate().toString().padStart(2, '0') + '.' +\r\n    (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +\r\n    dateComment.getFullYear().toString().slice(-2) + ' ' +\r\n    dateComment.getHours().toString().padStart(2, '0') + ':' +\r\n    dateComment.getMinutes().toString().padStart(2, '0');\r\n  return formatDate\r\n}\r\n\r\n;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchAndRenderComments)();\r\n\r\n// Экспорт данных в модули\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://yes/./main.js?");

/***/ }),

/***/ "./option.js":
/*!*******************!*\
  !*** ./option.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   edit: () => (/* binding */ edit),\n/* harmony export */   initAnswer: () => (/* binding */ initAnswer),\n/* harmony export */   like: () => (/* binding */ like)\n/* harmony export */ });\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\n// Импорт данных из модулей\r\n\r\n\r\n// Отправка коммента с помощью кнопки Enter\r\ndocument.addEventListener('keyup', (event) => {\r\n    if (event.key === \"Enter\") {\r\n      buttonElement.click()\r\n    }\r\n}); \r\n\r\n// Добавляем функцию активности лайка\r\nconst like = (comments) => {\r\n    const likeButtons = document.querySelectorAll('.likes-button');\r\n    for (const likeButton of likeButtons) {\r\n      likeButton.addEventListener('click', (e) => {\r\n        e.stopPropagation()\r\n        const index = likeButton.dataset.index;\r\n        if (comments[index].isActiveLike) {\r\n            comments[index].likes--;\r\n        } else {\r\n            comments[index].likes++;\r\n        }\r\n        comments[index].isActiveLike = !comments[index].isActiveLike;\r\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(comments);\r\n      })\r\n    }\r\n  };\r\n\r\n  \r\n  // Обработчик клика на комментарий (ответ на комментарий)\r\n  const initAnswer = () => {\r\n  const commentsElements = document.querySelectorAll(\".comment\");\r\n  const elementComment = document.getElementById('commentInput')\r\n  for (const commentElement of commentsElements) {\r\n    commentElement.addEventListener('click', () => {\r\n      if (document.querySelector(\".comment-text\") === null) return;\r\n      elementComment.value = `> ${commentElement.querySelector('.comment-text').innerHTML\r\n        .replaceAll(\"&amp\", \"&;\")\r\n        .replaceAll(\"&lt;\", \"<\")\r\n        .replaceAll(\"&gt;\", \">\")\r\n        .replaceAll(\"&quot;\", '\"')}`\r\n        + `\\n\\n${commentElement.querySelector('.comment-header').children[0].innerHTML\r\n          .replaceAll(\"&amp\", \"&;\")\r\n          .replaceAll(\"&lt;\", \"<\")\r\n          .replaceAll(\"&gt;\", \">\")\r\n          .replaceAll(\"&quot;\", '\"')}`\r\n    })\r\n  }\r\n};\r\n\r\n  // Добавляет кнопку редактирования комментария\r\n  const edit = (comments) => {\r\n    const editButtons = document.querySelectorAll('.edit-button');\r\n    const commentBody = document.querySelectorAll('.comment-body');\r\n\r\n    editButtons.forEach((button, index) => {\r\n      button.addEventListener('click', (e) => {\r\n        e.stopPropagation()\r\n        const commentBodyElem = commentBody[index];\r\n        const comment = comments[index];\r\n        if (comment.isEdit) {\r\n          const textarea = document.querySelector('.edit-textarea');\r\n          const newComment = textarea.value;\r\n          comment.textComment = newComment;\r\n        }\r\n        comment.isEdit = !comment.isEdit;\r\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(comments);\r\n      })\r\n    });\r\n  }\r\n\r\n\n\n//# sourceURL=webpack://yes/./option.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _option_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option.js */ \"./option.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\r\n\r\n// Импорт данных из модулей\r\n\r\n\r\n\r\nconst sendComment = () => {\r\n  const commentButton = document.getElementById('buttonComment');\r\n  commentButton.addEventListener('click', () => {\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.postComment)()\r\n  })\r\n}\r\n\r\n// Создаём рендер-функцию для добавления разметки html в JS\r\nconst renderComments = (comments, appHtml, user) => {\r\n  let isLoginMode = true;\r\n\r\n  // Переменная надписи об авторизации\r\n  const goToAuthHtml = `\r\n    <div>\r\n      <p class\"auth-text\">Чтобы добавить комментарий, <a href=\"#\" id=\"loginLink\">авторизуйтесь</a></p>\r\n    </div>\r\n  `;\r\n\r\n  // форма добавления комментария\r\n  const commentFormHtml = `\r\n    <div class=\"add-form\" id=\"addForm\">\r\n      <input type=\"text\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" id=\"nameInput\" value=\"${user}\" disabled\r\n      />\r\n      <textarea type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\" id=\"commentInput\">\r\n      </textarea>\r\n      <div class=\"add-form-row\">\r\n        <button class=\"add-form-button\" id=\"buttonComment\">Написать</button>\r\n      </div>\r\n    </div>`\r\n\r\n  const commentsHtml = comments.map((comment, index) => {\r\n    let likeActive = '';\r\n    if (comments[index].isActiveLike) {\r\n      likeActive = '-active-like';\r\n    }\r\n    return `\r\n    <li class=\"comment\">\r\n      <div class=\"comment-header\">\r\n        <div>${comment.name}</div>\r\n        <div>${comment.date}</div>\r\n      </div>\r\n      <div class=\"comment-body\">\r\n        <div class=\"${comment.isEdit ? 'none-visible' : 'comment-text'}\">\r\n          ${comment.textComment}\r\n        </div>\r\n        <textarea class=\"${comment.isEdit ? 'edit-textarea' : 'none-visible'}\" data-index=\"${index}\">\r\n          ${comment.textComment}\r\n        </textarea>\r\n      </div>\r\n      <div class=\"comment-footer\">\r\n        <button class=\"edit-button\">${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>\r\n        <div class=\"likes\">\r\n          <span class=\"likes-counter\">${comment.likes}</span>\r\n          <button class=\"likes-button ${likeActive}\" data-index=\"${index}\"></button>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    `;\r\n  }).join('');\r\n\r\n  // Разметка страницы HTML\r\n  const appEl = document.getElementById('app');\r\n  appHtml = `\r\n    <div class=\"container\">\r\n      <ul class=\"comments\" id=\"listComments\">${commentsHtml}</ul>\r\n    </div>\r\n    ${!(0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getToken)() ? goToAuthHtml : commentFormHtml}\r\n  `;\r\n\r\n  appEl.innerHTML = appHtml;      \r\n\r\n  // Обработчик клика Авторизуйтесь\r\n  const loginLinkEl = document.getElementById('loginLink')\r\n  loginLinkEl?.addEventListener('click', () => {\r\n    renderLoginform();\r\n  })\r\n\r\n  // Обработчик клика кнопки \"Войти\"\r\n  const renderLoginform = () => {\r\n    appEl.innerHTML = `\r\n      <div class=\"login-form\" id=\"addForm\">\r\n        <h2 class=\"comment-text\">${isLoginMode ? \"Авторизация\" : \"Регистрация\"}</h2>\r\n        ${isLoginMode ? '' : `<input type=\"text\" class=\"add-form-login-password\" placeholder=\"Введите ваше имя\" id=\"nameInput\" value=\"\" />`}\r\n  \r\n        <input type=\"text\" class=\"add-form-login-password\" placeholder=\"Введите ваше логин\" id=\"loginInput\" value=\"\" /> \r\n  \r\n        <input type=\"password\" class=\"add-form-login-password\" placeholder=\"Введите Ваш пароль\" id=\"passwordInput\" value=\"\"/>\r\n    \r\n        <div class=\"add-form-row\">\r\n          <button class=\"buttonLogin\" id=\"buttonLogin\">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>\r\n        </div>\r\n        <a href='#' style=\"text-decoration: underline;\" class=\"comment-text\" id=\"toggleLink\">${isLoginMode ? 'Зарегистрироваться' : \"Войти\"}</a>\r\n      </div>`\r\n    \r\n  const toggleButtonEl = document.getElementById('toggleLink')\r\n  toggleButtonEl.addEventListener('click', () => {\r\n    isLoginMode = !isLoginMode;\r\n    renderLoginform();\r\n  });\r\n\r\n  // Обработчик клика войти/зарегистроваться\r\n  const buttonLoginEl = document.getElementById('buttonLogin');\r\n  buttonLoginEl.addEventListener('click', () => {\r\n    const login = document.getElementById('loginInput').value;\r\n    const password = document.getElementById('passwordInput').value;\r\n\r\n    if (isLoginMode) {\r\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.loginUser)(login, password).then((response) => {\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.setToken)(response.user.token);\r\n        renderComments(comments, appHtml, response.user.name);\r\n        sendComment()\r\n      })\r\n    } else {\r\n      const name = document.getElementById('nameInput').value;\r\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.regUser)(login, password, name)\r\n        .then((response) => {\r\n          (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.setToken)(response.user.token);\r\n          renderComments(comments, appHtml, response.user.name);\r\n          sendComment();\r\n        })\r\n    }\r\n  })\r\n  }\r\n\r\n  ;(0,_option_js__WEBPACK_IMPORTED_MODULE_0__.like)(comments);\r\n  (0,_option_js__WEBPACK_IMPORTED_MODULE_0__.edit)(comments);\r\n  (0,_option_js__WEBPACK_IMPORTED_MODULE_0__.initAnswer)();\r\n} \r\n    \n\n//# sourceURL=webpack://yes/./render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;