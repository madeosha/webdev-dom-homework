"use strict";

// Импорт данных из модулей
import {nameInputElement, commentInputElement, listElement, loadingListElement, loadingCommentElement,  addFormElement} from './main.js'
import {like, initAnswer, edit} from "./option.js"

// Создаём рендер-функцию для добавления разметки html в JS
const renderComments = (commentsArr) => {
    const commentsHtml = commentsArr.map((comment, index) => {
      let likeActive = '';
      if (commentsArr[index].isActiveLike) {
        likeActive = '-active-like';
      }
      return `<li class="comment">
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
        </li>`;
    }).join('');
    listElement.innerHTML = commentsHtml;
  
    loadingListElement.style.display = 'none';
    loadingCommentElement.style.display = 'none';
    addFormElement.style.display = 'flex';
  
    nameInputElement.value = '';
    commentInputElement.value = '';
  
    like(commentsArr);
    initAnswer(commentsArr);
    edit(commentsArr);      
};

// Экспорт данных в модули
export { renderComments };