import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  TweetWrapper,
  AvatarWrapper,
  TweetsQuantity,
  FollowersQuantity,
  Button,
  ButtonText,
} from "./TweetCard.styled";
import { queryBackEnd } from "../../helpers/request";
// const { REACT_APP_BASE_URL } = process.env;

// export const instanceBacEnd = axios.create({
//   baseURL: REACT_APP_BASE_URL,
// });

//----------------------
export default function TweetCard({
  tweet,
  addFollowingsCurrentUser,
  followings,
  removeFollowingsCurrentUser,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentTweet, setTweet] = useState(tweet);

  useEffect(() => {
    setIsFollowing(followings.includes(tweet.id));
  }, [followings, tweet.id]);

  const handleClick = (evt) => {
    evt.preventDefault();
    const updatedFollowers = isFollowing
      ? currentTweet.followers - 1
      : currentTweet.followers + 1;

    if (!isFollowing) {
      addFollowingsCurrentUser(tweet.id);
    } else {
      removeFollowingsCurrentUser(tweet.id);
    }
    setIsFollowing(!isFollowing);
    const response = queryBackEnd.updateUser(tweet.id, updatedFollowers);
    response
      .then(() => {
        setTweet({ ...currentTweet, followers: updatedFollowers });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <TweetWrapper>
      <AvatarWrapper>
        <img src={currentTweet.avatar} alt={tweet.name} />
      </AvatarWrapper>
      <TweetsQuantity>{currentTweet.tweets} tweets</TweetsQuantity>

      <FollowersQuantity>
        {currentTweet.followers.toLocaleString("en-US")} Followers
      </FollowersQuantity>
      <Button onClick={handleClick} isFollowing={isFollowing}>
        <ButtonText>{isFollowing ? "Following" : "Follow"}</ButtonText>
      </Button>
    </TweetWrapper>
  );
}
