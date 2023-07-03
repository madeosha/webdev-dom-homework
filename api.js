"use strict";

// Импорт данных из модулей
import { DateFormatComment, comments, isPosting } from './main.js'
import { renderComments } from './render.js'


// Адерес сервера
const hostV1 = 'https://wedev-api.sky.pro/api';
const hostV2 = 'https://wedev-api.sky.pro/api/v2/elena-kozlova/comments'; 

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

token = null;

// Функция позволяющая изменять переменную токен в других модулях приложения
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = ( ) => {
  return token
}; 

//Функция входа по логину 
export const loginUser = (login, password) => {
  return fetch(
    `${hostV1}/user/login`,
    {
    method: "POST",
    body: JSON.stringify({
      login,
      password
    })
  }).then((response) => {
    return response.json()
  }) 
}

// Функция регистрации юзера
export const regUser = (login, password, name) => {
  return fetch(
    `${hostV1}/user`,
    {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        name,
      })
    }
  ).then((response) => {
    return response.json()
  })
}

// Получение данные из API
export const fetchAndRenderComments = () => {
  const headers = token ? { Authorization: `Bearer ${token}`, } : {};
    return fetch(
      hostV2, 
      {
        method: "GET",
        headers,
      })
    .then((response) => {
      return convertServer(response, comments)
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
export const postComment = () => {

  // Защащаем ввод данных
  const protectionHtml = (string) => {
    return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
  };

  // Добавляем новый комментарий в API
  const elementComment = document.getElementById('commentInput');
  const elementName = document.getElementById('nameInput');
    return fetch(
      hostV2, 
      {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        {
        text: protectionHtml(elementComment.value),
        name: protectionHtml(elementName.value),
        forceError: false,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          elementName.classList.remove('error');
          elementComment.classList.remove('error');
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Плохой запрос")
//        } else if (response.status === 401) {
//          throw new Error("Нет авторизации")
        } else if (response.status === 500) {
          throw new Error("Ошибка сервера")
        } else {
          throw new Error("У пользователя пропал интернет");
        }
      })
      .then(() => {
        elementName.value = '';
        elementComment.value = '';
//        buttonElement.disabled = true;
        fetchAndRenderComments();
      })
      .catch((error) => {
//        loadingCommentElement.style.display = 'none';
//        addFormElement.style.display = 'flex';
       if (error.message === "Плохой запрос") {
          elementComment.classList.add('error');
          elementName.classList.add('error');
          alert('Вы ввели слишком короткое имя или текст комментария')
//        } else if (error.message === "Нет авторизации") {
//          alert('Пожалуйста, зарегистрируйтесь')
        } else if (error.message === "Ошибка сервера") {
          alert("Сервер сломался");
//          postComment(comments);
       } else {
          alert("Кажется, что-то пошло не так, попробуйте позже");
          postComment();
          fetchAndRenderComments();          
        }
      })
};
