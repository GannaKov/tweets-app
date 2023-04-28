import React, { useState } from "react";
import { CustomSelect } from "./FilterSelector.styled";
const options = [
  { value: "show-all", label: "Show All" },
  { value: "follow", label: "Follow" },
  { value: "followings", label: "Followings" },
];

export default function FilterSelector({ onTypeChange }) {
  const [selectedOption, setSelectedOption] = useState("show-all");

  const handleChange = (newSelectedOption) => {
    if (newSelectedOption.value !== selectedOption) {
      setSelectedOption(newSelectedOption.value);
      console.log(`Option selected:`, newSelectedOption.value);
      onTypeChange(newSelectedOption.value);
    }
  };

  return (
    <CustomSelect
      className="react-select-container"
      classNamePrefix="react-select"
      value={options.find((option) => option.value === selectedOption)}
      onChange={handleChange}
      options={options}
    />
  );
}
