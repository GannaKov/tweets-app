import React, { useEffect, useState } from "react";
import TweetsList from "../../components/TweetsList";
import FilterSelector from "../../components/FilterSelector";
import axios from "axios";
import { PageWrapper, Button, ButtonText } from "./TweetsPage.styled";

export const instanceBacEnd = axios.create({
  baseURL: "https://6449944db88a78a8f00b5309.mockapi.io",
});

export default function TweetsPage() {
  const [tweets, setTweets] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3); //setPageSize
  const [isLastPage, setIsLastPage] = useState(false);
  //-----
  useEffect(() => {
    async function fetchCurrentUsers() {
      try {
        const result = await instanceBacEnd.get(`/currentUser/3`);
        setFollowings(result.data.followings);
        console.log("current", result.data.followings);
      } catch {}
    }
    fetchCurrentUsers();
  }, []);
  //----
  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await instanceBacEnd.get(
          `/users?page=${page}&limit=${pageSize}`
        );
        if (page === 1) {
          setTweets(data);
        } else {
          setTweets((prev) => [...prev, ...data]);
        }

        //We can define the last page this way, but that's a lot of queries
        // const { dataNext } = await instanceBacEnd.get(
        //   `/users?page=${page + 1}&limit=${pageSize}`
        // );
        const isFinish = data.length < pageSize;

        setIsLastPage(isFinish);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUsers();
  }, [page, pageSize, isLastPage]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setPage((state) => state + 1);
  };

  const addFollowingsCurrentUser = (id) => {
    async function updateFollowings() {
      try {
        console.log("in add");
        const updatedFollowings = [...followings, id];
        await instanceBacEnd.put(`/currentUser/3`, {
          followings: updatedFollowings,
        }); //{ followings: updatedFollowings }
        setFollowings(updatedFollowings);
      } catch (error) {
        console.log(error.message);
      }
    }
    updateFollowings();
  };

  const removeFollowingsCurrentUser = (id) => {
    async function updateFollowings() {
      try {
        console.log("in remove");
        const updatedFollowings = followings.filter(
          (followingId) => followingId !== id
        );
        await instanceBacEnd.put(`/currentUser/3`, {
          followings: updatedFollowings,
        }); //{ followings: updatedFollowings }
        setFollowings(updatedFollowings);
        console.log("updatedFollowings", updatedFollowings);
      } catch (error) {
        console.log(error.message);
      }
    }
    updateFollowings();
  };
  return (
    <PageWrapper>
      <FilterSelector />
      <TweetsList
        tweets={tweets}
        addFollowingsCurrentUser={addFollowingsCurrentUser}
        removeFollowingsCurrentUser={removeFollowingsCurrentUser}
        followings={followings}
      />
      {!isLastPage && (
        <Button onClick={handleClick}>
          <ButtonText>Load More</ButtonText>
        </Button>
      )}
    </PageWrapper>
  );
}
