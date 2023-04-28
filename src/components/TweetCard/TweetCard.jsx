import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TweetWrapper,
  AvatarWrapper,
  TweetsQuantity,
  FollowersQuantity,
  Button,
  ButtonText,
} from "./TweetCard.styled";

const { REACT_APP_BASE_URL } = process.env;

export const instanceBacEnd = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

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
    // if (followings.includes(tweet.id)) {
    //   setIsFollowing(true);
    // }
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
    async function updateUser() {
      try {
        setIsFollowing(!isFollowing);
        await instanceBacEnd.put(`/users/${tweet.id}`, {
          followers: updatedFollowers,
        });
        setTweet({ ...currentTweet, followers: updatedFollowers });
      } catch (error) {
        console.log(error.message);
      }
    }
    updateUser();
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
