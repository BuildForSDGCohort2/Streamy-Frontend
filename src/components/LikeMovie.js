import React, { useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { UserContext, ME } from "../context/UserContext";
import { MovieContext } from "../context/MovieContext";
import { GET_MOVIES } from "../views/App";

const CREATE_LIKE = gql`
  mutation($movieId: Int!) {
    createLike(movieId: $movieId) {
      movie {
        id
        likes {
          id
        }
      }
    }
  }
`;

const UPDATE_LIKE = gql`
  mutation($movieId: Int!) {
    updateLike(movieId: $movieId) {
      movie {
        id
        likes {
          id
        }
      }
    }
  }
`;

export default function LikeMovie({ movieId, likeCount }) {
  const currentUser = useContext(UserContext);
  const userlikes = currentUser.likeSet;

  const isMovieLiked =
    userlikes.findIndex(({ movie }) => movie.id === movieId) > -1;

  //   const { isMovieLiked, setIsMovieLiked } = useContext(LikeContext);
  //   setIsMovieLiked(isLiked);

  console.log(isMovieLiked);

  const handleLike = async (event, createLike, updateLike) => {
    event.preventDefault();

    if (isMovieLiked) {
      const res = await updateLike({
        variables: {
          movieId,
        },
        update: (proxy, { data: { updateLike } }) => {
          const likeData = proxy.readQuery({ query: ME });
          console.log("ldata>>>", likeData);
          console.log("index2222>>>", updateLike.movie.id);

          const index = likeData.me.likeSet.findIndex(
            (el) => el.movie.id === updateLike.movie.id
          );
          console.log("index>>>", index);
          console.log("index2222>>>", updateLike);
          const res = [
            ...likeData.me.likeSet.slice(0, index),
            ...likeData.me.likeSet.slice(index + 1),
          ];
          console.log("update result", res);
          proxy.writeQuery({ query: ME, data: { res } });
        },
        // refetchQueries: [{ query: ME }],
      });
      //   setIsMovieLiked(false);
    } else {
      const res = await createLike({
        variables: {
          movieId,
        },
        update: (proxy, { data: { createLike } }) => {
          const likeData = proxy.readQuery({ query: GET_MOVIES });
          console.log("like data", likeData);

          //   const dt = {
          //     me: likeData.movies.likes,
          //   };

          const index = likeData.movies.findIndex(
            (el) => el.id === createLike.movie.id
          );
          console.log("index>>>", index);

          //   console.log("dataaa", dt);
          console.log("dataaa22222", createLike);
          //   const res = [...likeData.me.likeSet, ...createLike.movie.likes];
          //   const res = [...likeData.movies.likes, ...createLike.movie.likes];
          const res = [];
          console.log("result", res);

          proxy.writeQuery({
            query: GET_MOVIES,
            data: { res },
          });
        },
        // refetchQueries: [{ query: ME }],
      });
      //   setIsMovieLiked(true);
    }
  };

  const { showMovieInfo, setShowMovieInfo } = useContext(MovieContext);

  console.log("show", showMovieInfo);

  const [createLike] = useMutation(CREATE_LIKE);
  const [updateLike] = useMutation(UPDATE_LIKE);

  return (
    <div
      className="btn-like"
      onClick={(event) => handleLike(event, createLike, updateLike)}
    >
      {isMovieLiked ? (
        <i className="ni ni-favourite-28" />
      ) : (
        <i className="far fa-heart" />
      )}
      <span className="like-text">{`${likeCount} ${
        likeCount > 1 ? "likes" : "like"
      }`}</span>
    </div>
  );
}
