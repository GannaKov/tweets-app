import React from "react";
import { TweetsListWrapper } from "./TweetsList.styled";
import TweetCard from "../../components/TweetCard";

export default function TweetsList({
  tweets,
  addFollowingsCurrentUser,
  followings,
  removeFollowingsCurrentUser,
}) {
  return (
    <>
      {tweets.length > 0 && (
        <TweetsListWrapper>
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              addFollowingsCurrentUser={addFollowingsCurrentUser}
              removeFollowingsCurrentUser={removeFollowingsCurrentUser}
              followings={followings}
            />
          ))}
        </TweetsListWrapper>
      )}
    </>
  );
}
