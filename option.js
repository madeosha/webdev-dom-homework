"use strict";

// Импорт данных из модулей
import { commentInputElement, buttonElement } from './main.js';
import { renderComments } from './render.js';

// Отправка коммента с помощью кнопки Enter
document.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      buttonElement.click()
    }
}); 

// Добавляем функцию активности лайка
const like = (commentsArr) => {
    const likeButtons = document.querySelectorAll('.likes-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        const index = likeButton.dataset.index;
        if (commentsArr[index].isActiveLike) {
            commentsArr[index].likes--;
        } else {
            commentsArr[index].likes++;
        }
        commentsArr[index].isActiveLike = !commentsArr[index].isActiveLike;
        renderComments(commentsArr);
      })
    }
  };

  // Добавляем обработчик клика на комментарий (ответ на комментарий)

const initAnswer = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
          commentInputElement.value = `> ${commentElement.querySelector('.comment-text').innerHTML
          .replaceAll("&amp", "&;")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`
            + `\n\n${commentElement.querySelector('.comment-header').children[0].innerHTML
            .replaceAll("&amp", "&;")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"')}`
        })
    }
};

// Добавляет кнопку редактирования комментария
const edit = (commentsArr) => {
    const editButtons = document.querySelectorAll('.edit-button');
    const commentBody = document.querySelectorAll('.comment-body');

    editButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation()
        const commentBodyElem = commentBody[index];
        const comment = commentsArr[index];
        if (comment.isEdit) {
          const textarea = document.querySelector('.edit-textarea');
          const newComment = textarea.value;
          comment.textComment = newComment;
        }
        comment.isEdit = !comment.isEdit;
        renderComments(commentsArr);
      })
    });
}

 // Экспорт данных в модули
 export { like, initAnswer, edit };