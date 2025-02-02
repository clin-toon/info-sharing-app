import React, { useState } from "react";

const DropdownMenu = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label
        htmlFor="dropdown"
        className="text-gray-700 font-medium text-sm text-center"
      >
        Sort By:
      </label>
      <select
        id="dropdown"
        value={selectedValue}
        onChange={handleChange}
        className="w-60 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Date">Date</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
