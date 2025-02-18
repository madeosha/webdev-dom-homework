"use strict";
// Импорт данных из модулей
import { fetchAndRenderComments } from "./api.js";
import { format } from "date-fns";

//  Массив в который будем рендерить полученные данные
let comments = [];

export let isPosting = false;

// Функция обработчика даты
const DateFormatComment = (commentDate) => {
  const createDate = format(new Date(commentDate), 'yyyy-MM-dd hh.mm.ss');
  const formatDate = createDate;
  //.getDate().toString().padStart(2, '0') + '.' +
  //  (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
  //  dateComment.getFullYear().toString().slice(-2) + ' ' +
  //  dateComment.getHours().toString().padStart(2, '0') + ':' +
  //  dateComment.getMinutes().toString().padStart(2, '0');
  return formatDate
}

fetchAndRenderComments();

// Экспорт данных в модули
export { comments, DateFormatComment };









