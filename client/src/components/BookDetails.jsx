import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { useQuery } from "@apollo/client";
import { getSingleBook } from "./../graphql-client/queries";

const BookDetails = (props) => {
  //console.log(props.bookId);
  const { loading, error, data } = useQuery(getSingleBook, {
    variables: {
      id: props.bookId,
    },
    skip: props.bookId === null,
  });
  if (loading) return <p>Loading book details ...</p>;

  if (error) return <p>Error loading book details</p>;
  const book = props.bookId !== null ? data.book : null;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please select book </Card.Text>
        ) : (
          <Fragment>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>

            <hr />
            <p>Author : {book.author.name}</p>
            <p>Age : {book.author.age}</p>
            <p>Book written by {book.author.name}</p>
            <ul>
              {book.author.books.map((detail) => (
                <li key={detail.id}>{detail.name}</li>
              ))}
            </ul>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
