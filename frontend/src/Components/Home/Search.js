import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Search = () => {
  const { RangePicker } = DatePicker;

  // Initialize keyword state with an empty object
  const [keyword, setKeyword] = useState({});

  // Initialize value state with an empty array
  const [value, setValue] = useState([]);

  const dispatch = useDispatch();
  function searchHandler(e) {
    e.preventDefault();
    dispatch(propertyAction.updateSearchParams(keyword));
    dispatch(getAllProperties());
    setKeyword({
      city: "",
      guests: "",
      dateIn: "",
      dateOut: "",
    });
    setValue([]);
  }

  function returnDates(date, dateString) {
    // Setting the date range value in state
    setValue([date[0], date[1]]);

    // Update keyword object with date range
    updateKeyword("dateIn", dateString[0]);
    updateKeyword("dateOut", dateString[1]);
  }

  // Function to update a specific field in the keyword state object
  const updateKeyword = (field, value) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="searchbar">
        {/* Input field for searching destinations */}
        <input
          type="text"
          className="search"
          id="search_destination"
          placeholder="Search Destinations"
          value={keyword.city}
          onChange={(e) => updateKeyword("city", e.target.value)}
        />
        {/* Date Range Picker */}
        <Space direction="vertical" size={12} className="search">
          <RangePicker
            value={value}
            format="YYYY-MM-DD"
            picker="date"
            className="date_picker"
            disabledDate={(current) => {
              return current && current.isBefore(Date.now(), "day");
            }}
            onChange={returnDates}
          />
        </Space>
        {/* Input field for adding guests */}
        <input
          type="number"
          className="search"
          id="addguest"
          placeholder="Add guest"
          value={keyword.guests}
          onChange={(e) => updateKeyword("guests", e.target.value)}
        />
        <span
          className="material-symbols-outlined searchicon"
          onClick={searchHandler}
        >
          search
        </span>
      </div>
    </>
  );
};

export default Search;
