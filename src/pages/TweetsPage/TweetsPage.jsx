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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3); //setPageSize
  const [isLastPage, setIsLastPage] = useState(false);
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
        console.log(isLastPage);
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
  return (
    <PageWrapper>
      <FilterSelector />
      <TweetsList tweets={tweets} />
      {!isLastPage && (
        <Button onClick={handleClick}>
          <ButtonText>Load More</ButtonText>
        </Button>
      )}
    </PageWrapper>
  );
}
