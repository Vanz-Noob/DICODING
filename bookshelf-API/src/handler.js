/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// membuat variable dengan isi yang randrom dari module nanoid
const { nanoid } = require('nanoid');
// memanggil books
const books = require('./books');
// membuat handler untuk addBookHandler
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // membuat logika penambahan buku dan response code
  if (name === undefined) {
    const response = 
    h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = 
    h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // pembuatan huruf dan angka secara random sebesar 16 karakter
  const id = nanoid(16);
  // menuliskan waktu pemasukan buku
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  //   membuat varible newBook untuk diisi keterangan buku baru
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
    // memasukan buku ke array buku
  books.push(newBook);
  // pengecekan apakah buku sudah berhasil masuk ke array
  const isSuccess = books.filter((note) => note.id === id).length > 0;
  // membuat logika response code jika berhasil dan tidak berhasil

  // respon jika buku berhasil di masukan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // respon jika buku tidak berhasil di masukan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// membuat handler untuk getAllBooksHandler
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  // jika user tidak memasukan inputan nama, sedang dibaca, dan sudah selesai
  if (!name && !reading && !finished) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // jika user memasukan inputan nama buku saja
  if (name) {
    // fiter buku agar non case sesitif
    const filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())[0]);
    const response = h.response({
      status: 'success',
      data: {
        books: filterBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // jika user memasukan inputan status membaca
  if (reading) {
    // jika user menginput status sedang dibaca pada hal berapa
    const bookSedangDibaca = books.filter((book) => Number(book.finished) === Number(finished));
    const response = h.response({
      status: 'success',
      data: {
        books: bookSedangDibaca.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // jika user berstatus sudah selesai membaca buku
  const bookSelesaiDibaca = books.filter((book) => Number(book.finished) === Number(finished));
  const response = h.response({
    status: 'success',
    data: {
      books: bookSelesaiDibaca.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// membuat handler untuk getBookIdHandler
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  // mencari buku berdasarkan id dari buku dari array pertama
  const book = books.filter((x) => x.id === bookId)[0];
  // jika buku ditemukan
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  // jika buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// membuat handler editBookByIdHandler
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  // menuliskan waktu pemasukan buku yang baru
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  // pencarian buku berdasarkan index
  const index = books.findIndex((x) => x.id === bookId);
  // jika client tidak memasukan nama buku ke query
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // jika client memasukan page dibaca lebih besar halaman di buku
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // jika berhasil memperbarui buku
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // jika gagal dalam memperbarui buku
  const response =
  h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// membuat handler deleteBookByIdHandler
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  // mencari buku berdasarkan id buku
  const bookIndex = books.findIndex((x) => x.id === bookId);
  // pengecekan buku berdasarkan id lalu dihapus
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // jika id buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// mengexport module yang ada di handler
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  deleteBookByIdHandler,
  editBookByIdHandler,
  getBookByIdHandler,
};
