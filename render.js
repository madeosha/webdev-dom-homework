"use strict";

// Импорт данных из модулей
import { like, initAnswer, edit } from "./option.js"
import { getToken, loginUser, regUser, setToken, postComment } from "./api.js";

const sendComment = () => {
  const commentButton = document.getElementById('buttonComment');
  commentButton.addEventListener('click', () => {
    postComment()
  })
}

// Создаём рендер-функцию для добавления разметки html в JS
export const renderComments = (comments, appHtml, user) => {
  let isLoginMode = true;

  // Переменная надписи об авторизации
  const goToAuthHtml = `
    <div>
      <p class"auth-text">Чтобы добавить комментарий, <a href="#" id="loginLink">авторизуйтесь</a></p>
    </div>
  `;

  // форма добавления комментария
  const commentFormHtml = `
    <div class="add-form" id="addForm">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" value="${user}" disabled
      />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="commentInput">
      </textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="buttonComment">Написать</button>
      </div>
    </div>`

  const commentsHtml = comments.map((comment, index) => {
    let likeActive = '';
    if (comments[index].isActiveLike) {
      likeActive = '-active-like';
    }
    return `
    <li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="${comment.isEdit ? 'none-visible' : 'comment-text'}">
          ${comment.textComment}
        </div>
        <textarea class="${comment.isEdit ? 'edit-textarea' : 'none-visible'}" data-index="${index}">
          ${comment.textComment}
        </textarea>
      </div>
      <div class="comment-footer">
        <button class="edit-button">${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="likes-button ${likeActive}" data-index="${index}"></button>
        </div>
      </div>
    </li>
    `;
  }).join('');

  // Разметка страницы HTML
  const appEl = document.getElementById('app');
  appHtml = `
    <div class="container">
      <ul class="comments" id="listComments">${commentsHtml}</ul>
    </div>
    ${!getToken() ? goToAuthHtml : commentFormHtml}
  `;

  appEl.innerHTML = appHtml;      

  // Обработчик клика Авторизуйтесь
  const loginLinkEl = document.getElementById('loginLink')
  loginLinkEl?.addEventListener('click', () => {
    renderLoginform();
  })

  // Обработчик клика кнопки "Войти"
  const renderLoginform = () => {
    appEl.innerHTML = `
      <div class="login-form" id="addForm">
        <h2 class="comment-text">${isLoginMode ? "Авторизация" : "Регистрация"}</h2>
        ${isLoginMode ? '' : `<input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="nameInput" value="" />`}
  
        <input type="text" class="add-form-login-password" placeholder="Введите ваше логин" id="loginInput" value="" /> 
  
        <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" value=""/>
    
        <div class="add-form-row">
          <button class="buttonLogin" id="buttonLogin">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
        </div>
        <a href='#' style="text-decoration: underline;" class="comment-text" id="toggleLink">${isLoginMode ? 'Зарегистрироваться' : "Войти"}</a>
      </div>`
    
  const toggleButtonEl = document.getElementById('toggleLink')
  toggleButtonEl.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    renderLoginform();
  });

  // Обработчик клика войти/зарегистроваться
  const buttonLoginEl = document.getElementById('buttonLogin');
  buttonLoginEl.addEventListener('click', () => {
    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;

    if (isLoginMode) {
      loginUser(login, password).then((response) => {
        setToken(response.user.token);
        renderComments(comments, appHtml, response.user.name);
        sendComment()
      })
    } else {
      const name = document.getElementById('nameInput').value;
      regUser(login, password, name)
        .then((response) => {
          setToken(response.user.token);
          renderComments(comments, appHtml, response.user.name);
          sendComment();
        })
    }
  })
  }

  like(comments);
  edit(comments);
  initAnswer();
} 
    