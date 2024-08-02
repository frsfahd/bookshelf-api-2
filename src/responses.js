/**
 * @function
 * @description create new Hapi response.
 */
const newResponse = (h, payload, status) => h.response(payload).code(status).type('application/json');

/**
 * @function
 * @description 201 POST /books.
 */
const POST_201 = (element) => ({
  status: 'success',
  message: 'Buku berhasil ditambahkan',
  data: { bookId: element },
});

/**
 * @constant
 * @description 400 POST /books.
 */
const POST_400_ERR_TITLE = {
  status: 'fail',
  message: 'Gagal menambahkan buku. Mohon isi nama buku',
};

/**
 * @constant
 * @description 400 POST /books.
 */
const POST_400_ERR_PAGE = {
  status: 'fail',
  message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
};

/**
 * @function
 * @description 200 GET /books.
 */
const GET_200_LIST = (elements) => ({
  status: 'success',
  data: { books: elements },
});

/**
 * @function
 * @description 200 GET /books/{bookId}.
 */
const GET_200_DETAIL = (element) => ({
  status: 'success',
  data: { book: element },
});

/**
 * @constant
 * @description 400 GET /books/{bookId}.
 */
const GET_404 = {
  status: 'fail',
  message: 'Buku tidak ditemukan',
};

/**
 * @constant
 * @description 200 PUT /books/{bookId}.
 */
const PUT_200 = {
  status: 'success',
  message: 'Buku berhasil diperbarui',
};

/**
 * @constant
 * @description 400 PUT /books/{bookId}.
 */
const PUT_400_ERR_TITLE = {
  status: 'fail',
  message: 'Gagal memperbarui buku. Mohon isi nama buku',
};

/**
 * @constant
 * @description 400 PUT /books/{bookId}.
 */
const PUT_400_ERR_PAGE = {
  status: 'fail',
  message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
};

/**
 * @constant
 * @description 404 PUT /books/{bookId}.
 */
const PUT_404 = {
  status: 'fail',
  message: 'Gagal memperbarui buku. Id tidak ditemukan',
};

/**
 * @constant
 * @description 200 DEL /books/{bookId}.
 */
const DEL_200 = {
  status: 'success',
  message: 'Buku berhasil dihapus',
};

/**
 * @constant
 * @description 404 DEL /books/{bookId}.
 */
const DEL_404 = {
  status: 'fail',
  message: 'Buku gagal dihapus. Id tidak ditemukan',
};

module.exports = {
  newResponse,
  GET_200_DETAIL,
  GET_200_LIST,
  GET_404,
  POST_201,
  POST_400_ERR_PAGE,
  POST_400_ERR_TITLE,
  PUT_400_ERR_PAGE,
  PUT_400_ERR_TITLE,
  PUT_404,
  PUT_200,
  DEL_200,
  DEL_404,
};
