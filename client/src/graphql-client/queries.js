import { gql } from "@apollo/client";

const getBooks = gql`
  query getBookQuery {
    books {
      id
      name
    }
  }
`;
const getSingleBook = gql`
  query getSingleBookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const getAllAuthors = gql`
  query getAllAuthorQuery {
    authors {
      id
      name
    }
  }
`;
export { getBooks, getSingleBook, getAllAuthors };
