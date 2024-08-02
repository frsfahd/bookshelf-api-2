const handler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.createNewRecord,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.showAllRecords,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.showRecordById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.updateById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteById,
  },
];

module.exports = routes;
