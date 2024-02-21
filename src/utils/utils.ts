async function checkAPIResponse(response: Response): Promise<any> {
  // Преобразуем ответ от сервера из формата JSON в JavaScript-объект
  const responseData = await response.json();
  // Проверяем, успешно ли выполнен запрос
  if (!response.ok) {
    // Если нет, выводим ошибку
    throw new Error(responseData.message);
  }
  // Иначе возвращает ответ от сервера
  return responseData;
}

export { checkAPIResponse };
