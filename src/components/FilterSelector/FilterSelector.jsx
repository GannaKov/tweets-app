import React, { useState } from "react";
import { CustomSelect } from "./FilterSelector.styled";
const options = [
  { value: "show-all", label: "Show All" },
  { value: "follow", label: "Follow" },
  { value: "followings", label: "Followings" },
];

export default function FilterSelector() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div>
      <CustomSelect
        className="react-select-container"
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
