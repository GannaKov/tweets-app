import React from "react";
import {
  TweetWrapper,
  AvatarWrapper,
  TweetsQuantity,
  FollowersQuantity,
  Button,
  ButtonText,
} from "./TweetCard.styled";

export default function TweetCard({ tweet }) {
  return (
    <TweetWrapper>
      <AvatarWrapper>
        <img src={tweet.avatar} alt={tweet.name} />
      </AvatarWrapper>
      <TweetsQuantity>{tweet.tweets} tweets</TweetsQuantity>
      <FollowersQuantity>{tweet.followers} Followers</FollowersQuantity>
      <Button>
        <ButtonText>Follow</ButtonText>
      </Button>
    </TweetWrapper>
  );
}
