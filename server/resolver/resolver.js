const { books, authors } = require("./../data/static");
const Author = require("./../models/Author");
const Book = require("./../models/Book");

const resolver = {
  //QUERY
  Query: {
    books: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAllBooks(),

    book: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getBookById(args.id),
    authors: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAllAuthors(),
    author: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.getAuthorById(args.id),
  },
  Book: {
    author: async (parent, args, { mongoDataMethod }) => {
      //console.log(parent);
      return await mongoDataMethod.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongoDataMethod }) => {
      return await mongoDataMethod.getAllBooks({ authorId: parent.id });
    },
  },

  //MUTATION

  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createAuthor(args),
    /* 
      args:{
        id
        name
        age
      }
    */
    createBook: async (parent, args, { mongoDataMethod }) =>
      await mongoDataMethod.createBook(args),
  },
};
module.exports = resolver;
