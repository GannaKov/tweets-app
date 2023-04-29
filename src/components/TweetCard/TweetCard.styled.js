import styled from "styled-components";
export const TweetWrapper = styled.li`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 480px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    rgba(71, 28, 169, 1),
    rgba(87, 54, 163, 1),
    rgba(75, 42, 153, 1)
  );
  box-shadow: -2.58rem 6.87rem 20.62rem rgba(0, 0, 0, 0.23);
`;
export const AvatarWrapper = styled.div`
  margin: 178px auto 26px;
  /* margin-top: 178px; */
  width: 80px;
  height: 80px;
  border: 4px solid rgba(235, 216, 255, 1);
  border-radius: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;
export const TweetsQuantity = styled.p`
  margin: 0 auto 16px;
  font-family: Montserrat;
  font-style: medium;
  font-size: 20px;
  line-height: 1;
  color: rgba(235, 216, 255, 1);
`;
export const FollowersQuantity = styled.p`
  margin: 0 auto 26px;
  color: rgba(235, 216, 255, 1);
  font-family: Montserrat;
  font-weight: 500;
  font-size: 20px;
  line-height: 1;
`;
export const Button = styled.button`
  background-color: ${(props) =>
    props.isFollowing ? "rgba(92, 211, 168, 1)" : "rgba(235, 216, 255, 1)"};
  margin: 0 auto;
  width: 196px;
  height: 50px;
  padding: 14px auto;
  border-radius: 10.31px;
  border: transparent;
`;
export const ButtonText = styled.p`
  color: rgba(55, 55, 55, 1);
  font-family: Montserrat;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
`;
