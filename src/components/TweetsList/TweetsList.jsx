import React from "react";
import { TweetsListWrapper } from "./TweetsList.styled";
import TweetCard from "../../components/TweetCard";
export default function TweetsList({ tweets }) {
  return (
    <>
      {tweets.length ? (
        <TweetsListWrapper>
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </TweetsListWrapper>
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
}
