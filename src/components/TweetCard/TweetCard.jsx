import React from "react";
import {
  TweetWrapper,
  AvatarWrapper,
  TweetsQuantity,
  FollowersQuantity,
  Button,
  ButtonText,
} from "./TweetCard.styled";

export default function TweetCard() {
  return (
    <TweetWrapper>
      <AvatarWrapper></AvatarWrapper>
      <TweetsQuantity>777 tweets</TweetsQuantity>
      <FollowersQuantity>100,500 Followers</FollowersQuantity>
      <Button>
        <ButtonText>Follow</ButtonText>
      </Button>
    </TweetWrapper>
  );
}
