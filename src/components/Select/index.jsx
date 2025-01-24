import React, { useState, useEffect } from "react";

function Select({ name, label, value, formik }) {
  const [unq, setIUnq] = useState([]);

  useEffect(() => {
    // Create a new Set to store unique lowercase values
    const uniqueValues = new Set();

    // Loop through 'value' and add each lowercase value to the Set
    value.forEach((item) => {
      uniqueValues.add(item.toLowerCase());
    });

    // Convert the Set to an array and update the state with unique values
    setIUnq([...uniqueValues]);
    
  }, [value]); // Trigger effect whenever 'value' changes
  
  return (
    <div className="mb-3">
      <label htmlFor="select">{label}</label>
      <select
        className="w-100 p-2 form-select bg-body-secondary"
        id="select"
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        style={{ outline: "none" }}
      >

        <option value="">{name === "venueName" ? "venue" : name === "category" ? "category" : "city"}</option>
        {unq.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
