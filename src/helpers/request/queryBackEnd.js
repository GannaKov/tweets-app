import axios from "axios";
const instanceBacEnd = axios.create({
  baseURL: "https://6449944db88a78a8f00b5309.mockapi.io",
});
const currentUser = 1;

// fetch currenUser
const fetchCurrentUsers = async () => {
  try {
    const { data } = await instanceBacEnd.get(`/currentUser/${currentUser}`);
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
// upd followings of currentUser
const updateFollowings = async (updatedFollowings) => {
  try {
    await instanceBacEnd.put(`/currentUser/${currentUser}`, {
      followings: updatedFollowings,
    });
  } catch (err) {
    return err.response.data.message;
  }
};
// upd followers of user
const updateUser = async (id, updatedFollowers) => {
  try {
    await instanceBacEnd.put(`/users/${id}`, {
      followers: updatedFollowers,
    });
  } catch (err) {
    return err.response.data.message;
  }
};
// fetch all tweets with pagination
const fetchUsers = async (page, pageSize) => {
  try {
    const { data } = await instanceBacEnd.get(
      `/users?page=${page}&limit=${pageSize}`
    );
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
// fetch all tweets
const fetchAllUsers = async () => {
  try {
    const { data } = await instanceBacEnd.get(`/users`);
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
const queryBackEnd = {
  fetchCurrentUsers,
  fetchUsers,
  updateFollowings,
  fetchAllUsers,
  updateUser,
};

export default queryBackEnd;
