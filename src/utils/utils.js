function checkAPIResponse(response) {
  // Проверяем, успешно ли выполнен запрос
  if (!response.ok) {
    // Если нет, выводим ошибку
    throw new Error('Ошибка получения списка ингредиентов с сервера.');
  }
}

export { checkAPIResponse };
