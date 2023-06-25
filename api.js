"use strict";

// Импорт данных из модулей
import { nameInputElement, commentInputElement, DateFormatComment, loadingCommentElement, addFormElement, comments, buttonElement } from './main.js'
import { renderComments } from './render.js'

// Получение данные из API
function fetchComments() {
    return fetch(
      "https://wedev-api.sky.pro/api/v2/elena-kozlova/comments", 
      {
        method: "GET",
      })
    .then((response) => {
      convertServer(response, comments)
    })
  }

  const convertServer = (response, comments) => {
    return response.json().then((responseData) => {
      comments = responseData.comments;
      comments = comments.map((comment) => {
        return {
          id:0,
          name: comment.author.name,
          date: DateFormatComment(comment.date),
          textComment: comment.text,
          likes: comment.likes,
          isActiveLike: false,
          isEdit: false
        }
      });
      renderComments(comments);
    })
  }
    
// Фукнция поторного вызова в случае ошибки от сервера
const postComment = () => {

  // Защащаем ввод данных
  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  // Добавляем новый комментарий в API
    return fetch(
      "https://wedev-api.sky.pro/api/v2/elena-kozlova/comments", 
      {
      method: 'POST',
      body: JSON.stringify(
        {
        text: protectionHtml(commentInputElement.value),
        name: protectionHtml(nameInputElement.value),
        forceError: false,
        })
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
            throw new Error("Плохой запрос")
        } else if (response.status === 500) {
            throw new Error("Ошибка сервера")
        } else {
          throw new Error("У пользователя пропал интернет");
        }
      })
      .then(() => {
        nameInputElement.value = '';
        commentInputElement.value = '';
        buttonElement.disabled = true;
        fetchComments();
      })
      .catch((error) => {
        loadingCommentElement.style.display = 'none';
        addFormElement.style.display = 'flex';
       if (error.message === "Плохой запрос") {
          commentInputElement.classList.add('error');
          nameInputElement.classList.add('error');
          alert('Вы ввели слишком короткое имя или текст комментария')
        } else if (error.message === "Ошибка сервера") {
          alert("Сервер сломался");
          postComment(comments);
       } else {
          alert("Кажется, что-то пошло не так, попробуйте позже");
        }
      });
};

// Экспорт данных в модули
export { fetchComments, postComment };
