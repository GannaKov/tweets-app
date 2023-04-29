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
  const [totalPagesAll, setTotalPagesAll] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [selectedType, setSelectedType] = useState("show-all");
  const [displayedCount, setDisplayedCount] = useState(3);
  //-----
  useEffect(() => {
    async function fetchCurrentUsers() {
      try {
        const { data } = await instanceBacEnd.get(`/currentUser/3`);

        const arr = data.followings.sort((a, b) => a - b);
        // setTotalItems(data.totalItems);
        setFollowings(arr);
        setTotalPages(Math.ceil(data.totalItems / pageSize));
        setTotalPagesAll(Math.ceil(data.totalItems / pageSize));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchCurrentUsers();
  }, [pageSize]);
  //----------------1
  useEffect(() => {
    if (selectedType === "show-all") {
      console.log("in UEf1");
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
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchUsers();
    }
  }, [page, pageSize, selectedType]);
  //-----------------------2
  useEffect(() => {
    if (selectedType !== "show-all") {
      setTweets(sortedData.slice(0, displayedCount));
      // async function fetchUsers() {
      //   try {
      //     const { data } = await instanceBacEnd.get(`/users`);
      //     console.log(data);
      //     let filteredData = data;
      //     if (selectedType === "followings") {
      //       filteredData = data.filter((user) => followings.includes(user.id));
      //     } else if (selectedType === "follow") {
      //       filteredData = data.filter((user) => !followings.includes(user.id));
      //     }
      //     setTotalPages(Math.ceil(followings.length / pageSize));
      //     setTweets(filteredData);
      //     console.log(
      //       "followings",
      //       followings,
      //       followings.length,
      //       Math.ceil(followings.length / pageSize)
      //     );
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // }
      // fetchUsers();
    }
  }, [page, pageSize, selectedType, followings, sortedData, displayedCount]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setPage((state) => state + 1);
    if (selectedType !== "show-all") {
      setDisplayedCount((prevCount) => prevCount + 3);
    }
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
    setTotalPages(1);
    setSelectedType(type);
    setDisplayedCount(3);
    if (type === "show-all") {
      setTotalPages(totalPagesAll);
    }
    if (type !== "show-all") {
      async function fetchUsers() {
        try {
          const { data } = await instanceBacEnd.get(`/users`);

          let filteredData = data;

          if (type === "followings") {
            filteredData = data.filter((user) => followings.includes(user.id));
            // setTotalPages(Math.ceil(followings.length / pageSize));
          } else if (type === "follow") {
            filteredData = data.filter((user) => !followings.includes(user.id));
          }
          setTotalPages(Math.ceil(filteredData.length / pageSize));
          setSortedData(filteredData);
          console.log(
            "sorted",

            filteredData.length,
            Math.ceil(filteredData.length / pageSize)
          );
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchUsers();
    }
  }
  // const displayedUsers = tweets.slice(0, displayedCount);

  return (
    <PageWrapper>
      <FilterSelector onTypeChange={handleSearchTypeChange} />
      <TweetsList
        tweets={tweets}
        addFollowingsCurrentUser={addFollowingsCurrentUser}
        removeFollowingsCurrentUser={removeFollowingsCurrentUser}
        followings={followings}
      />
      {page < totalPages && (
        <Button onClick={handleClick}>
          <ButtonText>Load More</ButtonText>
        </Button>
      )}
    </PageWrapper>
  );
}
// if (selectedType === "show-all") {displayedCount < tweets.length
//   // const { data } = await instanceBacEnd.get(
//   //   `/users?page=${page}&limit=${pageSize}`
//   // );
// }
// if (selectedType === "followings") {
// }
