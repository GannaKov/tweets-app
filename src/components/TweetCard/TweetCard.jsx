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
export const instanceBacEnd = axios.create({
  baseURL: "https://6449944db88a78a8f00b5309.mockapi.io",
});

//----------------------
export default function TweetCard({
  tweet,
  addFollowingsCurrentUser,
  followings,
  removeFollowingsCurrentUser,
}) {
  //   const [isFollowing, setIsFollowing] = useState(
  //     JSON.parse(localStorage.getItem(`isFollowing_${tweet.id}`)) || false
  //   );
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentTweet, setTweet] = useState(tweet);

  useEffect(() => {
    if (followings.includes(tweet.id)) {
      setIsFollowing(true);
    }
  }, [followings, tweet.id]);

  //   useEffect(() => {
  //     localStorage.setItem(
  //       `isFollowing_${tweet.id}`,
  //       JSON.stringify(isFollowing)
  //     );
  //   }, [isFollowing, tweet.id]);

  //   useEffect(() => {hz ???
  //     setIsFollowing(JSON.parse(localStorage.getItem("isFollowing")) || false);
  //   }, []);

  const handleClick = (evt) => {
    evt.preventDefault();

    console.log("isFollowing", isFollowing);
    const updatedFollowers = isFollowing
      ? currentTweet.followers - 1
      : currentTweet.followers + 1;

    if (!isFollowing) {
      addFollowingsCurrentUser(tweet.id);
      //   setIsFollowing(!isFollowing);
    } else {
      removeFollowingsCurrentUser(tweet.id);
      //   setIsFollowing(!isFollowing);
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
