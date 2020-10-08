import React from "react";
import ReactDOM from "react-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/main.scss";

import Root from "./Root";
import * as serviceWorker from "./serviceWorker";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    MovieType: {
      fields: {
        likes: {
          merge: false,
        },
      },
    },
  },
});

export const client = new ApolloClient({
  cache,
  link: new HttpLink({
    headers: {
      authorization: `JWT ${localStorage.getItem("authToken") || ""}`,
    },
    uri: "http://127.0.0.1:8000/graphql/",
    // uri: "https://streamyapp.herokuapp.com/graphql/",
  }),
});

export const IS_AUTHENTICATED = gql`
  query {
    isAuthenticated @client
  }
`;

cache.writeQuery({
  query: IS_AUTHENTICATED,
  data: {
    isAuthenticated: !!localStorage.getItem("authToken"),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
