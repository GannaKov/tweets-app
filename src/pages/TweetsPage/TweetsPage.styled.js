import styled from "styled-components";
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /*gap: 32px; */
  padding: 32px;
`;
export const GoBack = styled.button`
  width: 98px;
  height: 50px;
  padding: 14px auto;
  border-radius: 10.31px;
  border: 2px solid rgba(71, 28, 169, 0.8);
  background-color: white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
`;
export const Button = styled.button`
  width: 196px;
  height: 50px;
  padding: 14px auto;
  border-radius: 10.31px;
  border: transparent;
  background-color: rgba(71, 28, 169, 1); //rgba(75, 42, 153, 1);
  margin: 0 auto;
`;
export const ButtonText = styled.p`
  color: rgba(235, 216, 255, 1);
  font-family: Montserrat;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
`;
