import React, { Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@apollo/client";
import { getAllAuthors, getBooks } from "./../graphql-client/queries";
import { addSingleBook } from "./../graphql-client/mutation";

export default function BookForm() {
  const { loading, data } = useQuery(getAllAuthors);
  const [addBook, dataMutation] = useMutation(addSingleBook);

  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const handleChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
        refetchQueries: [{ query: getBooks }],
      },
    });
  };
  return (
    <div>
      <Row>
        <Col>
          <Form onSubmit={onSubmitForm}>
            <Form.Group>
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Book name"
                name="name"
                onChange={handleChange}
                value={newBook.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="genre"
                name="genre"
                onChange={handleChange}
                value={newBook.genre}
              />
            </Form.Group>

            <Form.Group>
              {loading ? (
                <p>Loading author</p>
              ) : (
                <Fragment>
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    as="select"
                    name="authorId"
                    onChange={handleChange}
                    value={newBook.authorId}
                  >
                    <option value="" disabled>
                      Select author
                    </option>
                    {data.authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </Form.Control>
                </Fragment>
              )}
            </Form.Group>

            <hr />
            <Button className="float-right" variant="info" type="submit">
              Add book
            </Button>
          </Form>
        </Col>

        <Col>
          <Form>
            <Form.Group className="invisible">
              <Form.Control />
            </Form.Group>
            <Form.Group className="invisible">
              <Form.Control />
            </Form.Group>

            <Form.Group>
              <Form.Label>Author name</Form.Label>
              <Form.Control type="text" placeholder="Author name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="genre" />
            </Form.Group>
            <Form.Group></Form.Group>
            <hr />
            <Button className="float-right" variant="info" type="submit">
              Add author
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
