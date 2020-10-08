import React, { useRef, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Button, Form, InputGroup } from "react-bootstrap";

const SEARCH_MOVIES = gql`
  query movie($search: String) {
    movies(search: $search) {
      id
      title
      year
      url
      rating
      description
      poster
      cover
      genre
      likes {
        id
      }
    }
  }
`;

export default function Search({ setSearchResults }) {
  const client = useApolloClient();
  const [search, setSearch] = useState("");
  const inputEl = useRef();

  //   const [open, setOpen] = useState(false);

  //   const hangleToggle = () => {
  //     setOpen(!open);
  //     inputEl.current.focus();
  //   };

  const clearSearchInput = () => {
    setSearchResults([]);
    setSearch("");
    inputEl.current.focus();
  };

  const handleSubmit = async (event, client) => {
    event.preventDefault();

    const res = await client.query({
      query: SEARCH_MOVIES,
      variables: {
        search,
      },
    });

    console.log(res);

    setSearchResults(res.data.movies);
  };

  return (
    <>
      <Form
        className="search"
        onSubmit={(event) => handleSubmit(event, client)}
      >
        <Form.Group className="search-group">
          <InputGroup>
            <InputGroup.Prepend>
              <Button
                style={{
                  backgroundColor: "#333",
                  border: 0,
                }}
                onClick={clearSearchInput}
              >
                <i className="fa fa-times" />
              </Button>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              ref={inputEl}
              value={search}
              placeholder="Type here to search..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <InputGroup.Append>
              <Button
                // type="submit"
                style={{
                  backgroundColor: "#333",
                  border: 0,
                }}
                onClick={(event) => handleSubmit(event, client)}
              >
                <i className="fa fa-search" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>

      {/* <div className={`header-1 ${open && "show"}`}>
        <div className="search-button" type="submit">
          <span
            className={`search-toggle ${open && "active"}`}
            data-selector="#header-1"
            onClick={() => hangleToggle()}
          ></span>
        </div>
         <Form
          className="search-box"
          onSubmit={(event) => handleSubmit(event, client)}
        >
          <Form.Group className="search-box text search-input">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="ni ni-circle-08" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                ref={inputEl}
                // className="text search-input"
                placeholder="Type here to search..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form> 
      </div> */}
    </>
  );
}
