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
  const [selectedType, setSelectedType] = useState("show-all");
  //-----
  useEffect(() => {
    async function fetchCurrentUsers() {
      try {
        const result = await instanceBacEnd.get(`/currentUser/3`);
        const arr = result.data.followings.sort((a, b) => a - b);

        setFollowings(arr);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchCurrentUsers();
  }, []);
  //----------------1
  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await instanceBacEnd.get(
          `/users?page=${page}&limit=${pageSize}`
        );
        let filteredData = data;

        if (page === 1) {
          setTweets(filteredData);
        } else {
          setTweets((prev) => [...prev, ...filteredData]);
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
  //-----------------------2
  useEffect(() => {
    if (selectedType !== "show-all") {
      async function fetchUsers() {
        try {
          console.log("page", page);
          console.log("tweets", tweets);

          console.log("followings", followings, followings.length);

          const { data } = await instanceBacEnd.get(
            `/users?page=${page}&limit=${pageSize}`
          );
          let filteredData = data;
          if (selectedType === "followings") {
            console.log("followings", followings, followings.length);
            filteredData = data.filter((user) => followings.includes(user.id));
          } else if (selectedType === "follow") {
            filteredData = data.filter((user) => !followings.includes(user.id));
          }

          if (page === 1) {
            setTweets(filteredData);
          } else {
            setTweets((prev) => [...prev, ...filteredData]);
          }
          const isFinish = data.length < pageSize;

          setIsLastPage(isFinish);
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchUsers();
    }
  }, [page, pageSize, isLastPage, selectedType, followings]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setPage((state) => state + 1);
  };

  const addFollowingsCurrentUser = (id) => {
    async function updateFollowings() {
      try {
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
        const updatedFollowings = followings.filter(
          (followingId) => followingId !== id
        );
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
  function handleSearchTypeChange(type) {
    setTweets([]);
    setPage(1);

    setSelectedType(type);
  }
  return (
    <PageWrapper>
      <FilterSelector onTypeChange={handleSearchTypeChange} />
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
// if (selectedType === "show-all") {
//   // const { data } = await instanceBacEnd.get(
//   //   `/users?page=${page}&limit=${pageSize}`
//   // );
// }
// if (selectedType === "followings") {
// }
