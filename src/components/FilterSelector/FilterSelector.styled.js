import styled from "styled-components";
import ReactSelect from "react-select";
export const CustomSelect = styled(ReactSelect)`
  margin: 0 auto 16px;
  border: 1px;
  border-style: solid;
  border-color: rgba(250, 250, 250, 0.2);
  border-radius: 6px;
  .react-select__control {
    height: 34px;
    width: 246px;
    border: 3px solid rgba(71, 28, 169, 0.5);
    outline: 0;
    box-shadow: none;
    &:active,
    &:hover,
    &:focus {
      outline: 0;
      border-color: rgba(71, 28, 169, 0.8);
      box-shadow: none;
    }
    .css-t3ipsp-control {
      outline: 0;
      border: 0;
      box-shadow: none;
    }
  }
  /* .react-select__dropdown-indicator {
    color: #8baa36;
  } */
  .react-select__menu {
    width: 246px;
    /* margin-bottom: 0px; */
  }
  .react-select__option {
    cursor: pointer;
  }
  .react-select__option:hover,
  .react-select__option:focus {
    color: rgba(235, 216, 255, 1);
    background-color: rgba(71, 28, 169, 1);
  }
`;