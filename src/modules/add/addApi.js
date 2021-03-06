import axios from 'axios';
import { apiUrl } from '../url';
import { API_ACTIONS } from '../apiActions';

export const fetchAddBook = async (token, book) => {
  try {
    const { isbn, author, publisher, title, categories } = book;
    const urlParams = {
      action: API_ACTIONS.ADD_BOOK,
      user_token: token,
      ':ISBN': isbn,
      ':Author': author,
      ':Publisher': publisher,
      ':Title': title,
      ':Category': categories,
    };

    const response = await axios.post(`${apiUrl}/`, {
      ...urlParams,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
