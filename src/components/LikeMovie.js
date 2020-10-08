import React, { useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { UserContext } from "../context/UserContext";

const CREATE_LIKE = gql`
  mutation($movieId: Int!) {
    createLike(movieId: $movieId) {
      user {
        id
        likeSet {
          id
        }
      }
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
      user {
        id
        likeSet {
          id
        }
      }
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

  const handleLike = async (event, createLike, updateLike) => {
    event.preventDefault();

    if (isMovieLiked) {
      await updateLike({
        variables: {
          movieId,
        },
      });
      //   setIsMovieLiked(false);
    } else {
      await createLike({
        variables: {
          movieId,
        },
      });
      //   setIsMovieLiked(true);
    }
  };

  // const { showMovieInfo, setShowMovieInfo } = useContext(MovieContext);

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
