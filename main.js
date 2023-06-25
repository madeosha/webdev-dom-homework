"use strict";

// Импорт данных из модулей
import { renderComments } from './render.js'
import { fetchComments, postComment} from "./api.js";

// Получаем доступ к разметке html в JS
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElement = document.getElementById("list");
const editButton = document.querySelector("edit-button");
const loadingListElement = document.getElementById('loadingList');
const loadingCommentElement = document.getElementById('loadingComment');
const addFormElement = document.getElementById('addForm')

//  Массив в который будем рендерить полученные данные
let comments = [];

// Убираем обработчик загрузки с экрана
loadingCommentElement.style.display = 'none';

// Добавляем дату нового комментария
const DateFormatComment = (commentDate) => {
  const dateComment = new Date(commentDate);
  const formatDate = dateComment.getDate().toString().padStart(2, '0') + '.' +
    (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
    dateComment.getFullYear().toString().slice(-2) + ' ' +
    dateComment.getHours().toString().padStart(2, '0') + ':' +
    dateComment.getMinutes().toString().padStart(2, '0');
    return formatDate
}

// Обработчик клика кнопки "Написать"
buttonElement.addEventListener("click", () => {
  loadingCommentElement.style.display = 'block';
  addFormElement.style.display = 'none';
  postComment()
});

// Активность кнопки "Написать"
buttonElement.disabled = true;
nameInputElement.addEventListener('input', () => {
  if (nameInputElement.value.trim() !== "") {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
});

//Удаление последнего комментария
const deleteComment = document.getElementById('delComment');
  deleteComment.addEventListener('click', () => {
    const lastCommentIndex = listElement.innerHTML.lastIndexOf(`<li class="comment">`);
    if (lastCommentIndex !== -1) {
      listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex)
    }
    comments.pop();
  });
  
renderComments(comments);
fetchComments();

// Экспорт данных в модули
export { nameInputElement, commentInputElement, editButton, listElement, buttonElement, loadingListElement, loadingCommentElement, addFormElement, comments, DateFormatComment, deleteComment };









