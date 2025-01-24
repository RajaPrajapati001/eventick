import * as Yup from "yup";

export const loginContentSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your correct email")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
  password: Yup.string()
    .min(8, "Invalid Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`]{8,}$/,
      "Incorrect Password"
    )
    .max(20, "Invalid Password")
    .required("Password is required"),
});

export const loginWithOtpSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your email")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
});

export const otpSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .length(4, "OTP must be exactly 4 digits"),
});

export const signUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
  phoneOrEmail: Yup.string()
    .required("Please enter your email")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`]{8,}$/,
      "Password must contain at least an number, special characters, Uppercase and lowercase letter"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const updatePasswordSchema = Yup.object({
  NewPassword: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`]{8,}$/,
      "Password must contain at least an number, special characters, Uppercase and lowercase letter"
    )
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword")], "Password should be same")
    .required("Password is required"),
});

export const forgetPasswordSchema = Yup.object({
  MobileForget: Yup.string()
    .required("Please enter your email")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
});

export const organizerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Please enter at least 2 characters")
    .max(25, "You can enter a maximum of 25 characters")
    .required("Name is required"),
  textarea: Yup.string()
    .min(70, "Please enter at least 70 characters")
    .max(100, "You can enter a maximum of 100 characters")
    .required("Description is required"),
  category: Yup.string().required("Please select a category"),
  city: Yup.string().required("Please select a city"),
  startDate: Yup.date()
    .nullable()
    .min(new Date(), "Start date cannot be in the past")
    .required("Start date is required"),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref("startDate"), "End date cannot be before the start date")
    .required("End date is required"),
  startTime: Yup.string()
    .required("Start time is required")
    .test("isValidTime", "Start time cannot be in the past", function (value) {
      console.log("Yup...", value);

      const { startDate } = this.parent;
      if (!startDate || !value) return; // Skip if no date or time is provided

      const selectedDate = new Date(startDate);
      console.log("YupStart...", selectedDate);

      const [hours, minutes] = value.split(":").map(Number);
      selectedDate.setHours(hours, minutes, 0, 0);

      const currentTime = new Date();
      console.log("Yupcrrent...", currentTime);

      // Check if the selected date is today or in the future
      if (selectedDate < currentTime) {
        console.log("erorr");
        // If the selected date is in the past, show error
      }

      return true; // If the date is valid (not in the past)

    }),

  endTime: Yup.string()
    .required("End time is required")
    .test(
      "isAfterStartTime",
      "End time must be after start time",
      function (value) {
        console.log("--------------------", value);

        const { startDate, startTime, endDate } = this.parent;
        if (!startDate || !endDate || !value || !startTime) return true; // Skip validation if any value is missing

        if (startDate.getTime() === endDate.getTime()) {
          const [startHours, startMinutes] = startTime.split(":").map(Number);
          const [endHours, endMinutes] = value.split(":").map(Number);

          // Create Date objects with the provided times to compare
          const startDateTime = new Date(startDate);
          const endDateTime = new Date(startDate);
          startDateTime.setHours(startHours, startMinutes, 0, 0);
          endDateTime.setHours(endHours, endMinutes, 0, 0);

          return endDateTime > startDateTime; // Check if endTime is after startTime
        }

        return true; // No need to validate time if dates are different
      }
    ),
  quantity: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be a whole number")
    .required("Quantity is required")
    .test(
      "isGreaterThanZero",
      "quantity should be less than capacity or equal",
      function (value) {
        console.log(value);

        const { capacity } = this.parent;
        console.log(capacity);

        return value <= capacity;
      }
    ),
  price: Yup.number()
    .typeError("Please enter a valid price")
    .positive("Price must be a positive number")
    .required("Price is required"),
  // img: Yup.string().required("Please upload an image"),
  image: Yup.mixed()
        .nullable()
        .required("Image is required")
        .test(
          "fileSize",
          "File size is too large. Max size is 2MB.",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        .test(
          "fileFormat",
          "Unsupported file format. Only JPG, PNG, and JPEG are allowed.",
          (value) =>
            !value ||
            (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
        )

});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  phoneOrEmail: Yup.string()
    .required("Required")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
});

export const FormSchema = Yup.object({
  FirstName: Yup.string().required("Please enter your name"),
  LastName: Yup.string().required("Please enter your message"),
  Email: Yup.string()
    .required("Required")
    .test("is-valid", "Invalid email", (value) =>
      Yup.string().email().isValidSync(value)
    ),
  Description: Yup.string().required("Please enter description").min(10),
});

export const cancelSchema = Yup.object({
  reason: Yup.string().required("please enter valid reason").min(10),
});

export const editModal = Yup.object({
  event_name: Yup.string().required("please enter valid event name").min(10),
  event_details: Yup.string().required("please enter valid event name").min(10),
});

export const blogUpdate = Yup.object({
  name: Yup.string()
    .min(2, "please enter coorect name")
    .max(25, "you caant enter grather than 25 char")
    .required("name is requried"),
  date: Yup.date()
    .required("please select date"),
  heading: Yup.string("please enter heading"),
  discription: Yup.string("please enter discription")
    .min(70, "please enter atleast 70 char")
    .max(100, "you can enter max 100 char")
})
export const newPlaceSchema = Yup.object({
  Place: Yup.string()
    .min(2, 'Place name must be at least 2 characters.')
    .max(50, 'Place name must not exceed 50 characters.')
    .matches(/^[A-Za-z\s]+$/, 'Place name must contain only letters.')
    .required('Required'),
  City: Yup.string()
    .min(2, 'City name must be at least 2 characters.')
    .max(50, 'City name must not exceed 15 characters.')
    .matches(/^[A-Za-z\s]+$/, 'City name must contain only letters.')
    .required('Required'),
  Seats: Yup.string()
    .matches(/^[1-9][0-9]*$/, 'Seats must not start with 0 and should only contain digits.')
    .required('Seats is required'),
  Placeprice: Yup.string()
    .matches(/^[1-9][0-9]*$/, 'Price must not start with 0 and should only contain digits.')
    .required('Place price is required'),
});
export const blog = Yup.object({
  name: Yup.string()
    .min(2, "please enter coorect name")
    .max(25, "you caant enter grather than 25 char")
    .required("name is requried"),
  date: Yup.date()
    .required("please select date")
    .max(new Date(), "Date must be in the past"),
  // heading: Yup.string("please"),
  discription: Yup.string()
    .min(70, "please enter atleast 70 char")
    .max(150, "you can enter max 150 char"),
});
