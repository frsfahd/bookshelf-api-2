const res = require('./helper/responses');
const { nanoid } = require('nanoid');
const Books = require('./db');

const createNewRecord = (request, h) => {
  const body = request.payload;

  let resPayload;
  let response;

  // request validation
  if (body.readPage > body.pageCount) {
    resPayload = res.POST_400_ERR_PAGE;
    response = res.newResponse(h, resPayload, 400);
    return response;
  } else if (!body.hasOwnProperty('name')) {
    resPayload = res.POST_400_ERR_TITLE;
    response = res.newResponse(h, resPayload, 400);
    return response;
  }

  const isFinished = body.pageCount === body.readPage ? true : false;
  const currentTime = new Date().toISOString();
  const bookId = nanoid();

  // const newRecord = req.POST_BODY(bookId, (insertedAt = currentTime), (updatedAt = currentTime), isFinished, body);
  const newRecord = {
    id: bookId,
    ...body,
    finished: isFinished,
    insertedAt: currentTime,
    updatedAt: currentTime,
  };

  Books.push(newRecord);

  resPayload = res.POST_201(bookId);
  response = res.newResponse(h, resPayload, 201);

  return response;
};
const showAllRecords = (request, h) => {
  const { name = null, finished = null, reading = null } = request.query;
  // let records;
  let records = Books.map((book) => book);
  // console.log('=========');
  // console.log(Books);

  if (reading !== null) {
    records = Books.filter((book) => book.reading == reading);
  } else if (name !== null) {
    // console.log('Name to filter:', name);
    // console.log('Book names:');
    // Books.forEach((book) => console.log(book.name));

    // records = Books.reduce((acc, book) => {
    //   if (book.name.toLowerCase().includes(name.toLowerCase())) {
    //     acc.push(book);
    //   }
    //   return acc;
    // }, []);
    records = Books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  } else if (finished !== null) {
    records = Books.filter((book) => book.finished == finished);
  }
  // else {
  //   records = Books.map((book) => book);
  // }

  records = records.map((book) => {
    return { id: book.id, name: book.name, publisher: book.publisher };
  });

  const resPayload = res.GET_200_LIST(records);
  const response = res.newResponse(h, resPayload, 200);

  return response;
};

const showRecordById = (request, h) => {
  const id = request.params.bookId;
  const record = Books.find((book) => book.id === id);

  let response;
  let resPayload;

  if (!record) {
    resPayload = res.GET_404;
    response = res.newResponse(h, resPayload, 404);
    return response;
  }

  resPayload = res.GET_200_DETAIL(record);
  response = res.newResponse(h, resPayload, 200);
  return response;
};

const updateById = (request, h) => {
  const id = request.params.bookId;
  const body = request.payload;
  const currentTime = new Date().toISOString();
  const isFinished = body.pageCount === body.readPage ? true : false;
  let resPayload;
  let response;
  const index = Books.findIndex((book) => book.id === id);

  // request validation
  if (index === -1) {
    resPayload = res.PUT_404;
    response = res.newResponse(h, resPayload, 404);
    return response;
  } else if (!body.hasOwnProperty('name')) {
    resPayload = res.PUT_400_ERR_TITLE;
    response = res.newResponse(h, resPayload, 400);
    return response;
  } else if (body.readPage > body.pageCount) {
    resPayload = res.PUT_400_ERR_PAGE;
    response = res.newResponse(h, resPayload, 400);
    return response;
  }
  // const reqPayload = req.PUT_BODY(isFinished, body);
  const oldRecord = Books[index];
  const newRecord = { ...oldRecord, ...body, isFinished, updatedAt: currentTime };
  Books.splice(index, 1, newRecord);
  resPayload = res.PUT_200;
  response = res.newResponse(h, resPayload, 200);

  return response;
};

const deleteById = (request, h) => {
  const id = request.params.bookId;

  const index = Books.findIndex((book) => book.id === id);
  let resPayload;
  let response;
  if (index === -1) {
    resPayload = res.DEL_404;
    response = res.newResponse(h, resPayload, 404);
    return response;
  }

  Books.splice(index, 1);
  resPayload = res.DEL_200;
  response = res.newResponse(h, resPayload, 200);

  return response;
};

module.exports = { createNewRecord, showAllRecords, showRecordById, updateById, deleteById };
