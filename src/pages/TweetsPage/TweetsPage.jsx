import React, { useEffect, useState } from "react";
import TweetsList from "../../components/TweetsList";
import FilterSelector from "../../components/FilterSelector";
import {
  PageWrapper,
  Button,
  ButtonText,
  GoBack,
  Link,
} from "./TweetsPage.styled";

import { queryBackEnd } from "../../helpers/request";
import { useLocation } from "react-router-dom";

export default function TweetsPage() {
  const location = useLocation();

  const [tweets, setTweets] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [totalPagesAll, setTotalPagesAll] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [selectedType, setSelectedType] = useState("show-all");
  const [displayedCount, setDisplayedCount] = useState(3);
  //-----
  useEffect(() => {
    const response = queryBackEnd.fetchCurrentUsers();
    response
      .then((result) => {
        const arr = result.followings.sort((a, b) => a - b);
        setFollowings(arr);
        setTotalPages(Math.ceil(result.totalItems / pageSize));
        setTotalPagesAll(Math.ceil(result.totalItems / pageSize));
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [pageSize]);
  //----------------1
  useEffect(() => {
    if (selectedType === "show-all") {
      const response = queryBackEnd.fetchUsers(page, pageSize);
      response
        .then((data) => {
          let filteredData = data;
          if (page === 1) {
            setTweets(filteredData);
          } else {
            setTweets((prev) => [...prev, ...filteredData]);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }, [page, pageSize, selectedType]);
  //-----------------------2
  useEffect(() => {
    if (selectedType !== "show-all") {
      setTweets(sortedData.slice(0, displayedCount));
    }
  }, [selectedType, sortedData, displayedCount]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setPage((state) => state + 1);
    if (selectedType !== "show-all") {
      setDisplayedCount((prevCount) => prevCount + 3);
    }
  };

  const addFollowingsCurrentUser = (id) => {
    const updatedFollowings = [...followings, id];
    const response = queryBackEnd.updateFollowings(updatedFollowings);
    response
      .then(() => {
        setFollowings(updatedFollowings);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const removeFollowingsCurrentUser = (id) => {
    const updatedFollowings = followings.filter(
      (followingId) => followingId !== id
    );
    const response = queryBackEnd.updateFollowings(updatedFollowings);
    response
      .then(() => {
        setFollowings(updatedFollowings);
      })
      .catch(function (error) {
        console.log(error.message);
      });
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
      const response = queryBackEnd.fetchAllUsers();
      response
        .then((data) => {
          let filteredData = data;

          if (type === "followings") {
            filteredData = data.filter((user) => followings.includes(user.id));
          } else if (type === "follow") {
            filteredData = data.filter((user) => !followings.includes(user.id));
          }
          setTotalPages(Math.ceil(filteredData.length / pageSize));
          setSortedData(filteredData);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }

  const goBack = location.state?.from ?? "/";
  return (
    <PageWrapper>
      <GoBack>
        <Link to={goBack}>&lt;-- Go Back</Link>
      </GoBack>
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
