import "../../../src/index.css";
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Button } from "react-bootstrap";

const Input = ({ name, type, formik, value,  placeholder, id, icon,disabled=false, bg = "bg-grey", label, readOnly = "", }) => {
  const [showPassword, setShowPassword] = useState(false);
  // console.log("Input : ", formik.values[name]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  
  
  return (
    <>
        {label? <label htmlFor="label">{label}</label>:""}
        <div className={`d-flex mb-3 flex-row ${bg} rounded-3`}>
          <span className='py-1 my-1 ps-3 pe-1'>{icon}</span>
          {/* {console.log("--------------------",value)} */}
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            name={name}
            id={id || undefined || "label"} 
            value={formik.values[name] || value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`border-0 w-100 my-1 ${bg} rounded-3 fs-7 px-2 py-1`}
            readOnly={readOnly}
          />
          {type === 'password' && (
            <Button
              className='border-0 ms-1 text text-secondary bg-grey'
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer'}}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </Button>
          )}
        </div>
        {formik.touched[name] && formik.errors[name] ? (
          <div className='flex-column formargin text-danger text-start mb-2 fs-8'>{formik.errors[name]}</div>
        ) : null}
    
    </>
  );
}

export default Input;