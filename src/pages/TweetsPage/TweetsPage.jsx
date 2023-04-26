import React, { useEffect } from "react";
import TweetCard from "../../components/TweetCard";
import axios from "axios";

export const instanceBacEnd = axios.create({
  baseURL: "https://6449944db88a78a8f00b5309.mockapi.io",
});

export default function TweetsPage() {
  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await instanceBacEnd.get(`/users`);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <TweetCard />
    </div>
  );
}
