import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://event-management-t96y.onrender.com",
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/signup-otp",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/otp-verify",
        method: "POST",
        body: {
          email,
          otp,
        },
      }),
    }),
    loginWithOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/login-forget-otp",
        method: "POST",
        body: { email },
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    storeData: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          firstName,
          lastName,
          email,
          password,
        },
      }),
    }),
    loginOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/login-with-otp",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    updateData: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login-update-password",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    profileData: builder.mutation({
      query: (email) => ({
        url: "/organizer/check-status",
        method: "POST",
        body: email,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
    }),
    profilePic: builder.mutation({
      query: (email) => ({
        url: "/organizer/check-status",
        method: "POST",
        body: email,
      }),
    }),
    carouselInfo: builder.query({
      query: () => ({
        url: "/event/filter",
        method: "GET",
      }),
    }),
    blogSection: builder.query({
      query: () => ({
        url: "/blog/all",
        method: "GET",
      }),
    }),
    cartData: builder.mutation({
      query: ({ userEmail }) => ({
        url: "/cart/data",
        method: "POST",
        body: {
          userEmail,
        },
      }),
    }),
    becomeOrganizer: builder.mutation({
      query: ({ firstname, lastname, email, organizationName, details }) => ({
        url: "/organizer/apply",
        method: "POST",
        body: {
          firstname,
          lastname,
          email,
          organizationName,
          details,
        },
      }),
    }),
    removeEvent: builder.mutation({
      query: ({ eventUuid }) => ({
        url: `/cart/delete/${eventUuid}`,
        method: "DELETE",
        body: {},
      }),
    }),
    updateQuantity: builder.mutation({
      query: ({ addToCartUuid, ticketQuantity }) => ({
        url: "/cart/update",
        method: "PUT",
        body: {
          addToCartUuid,
          ticketQuantity,
        },
      }),
    }),

    checkStatus: builder.mutation({
      query: ({ email }) => ({
        url: "/organizer/check-status",
        method: "POST",
        body: {
          email,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: ({ eventUuid, userEmail, ticketQuantity }) => ({
        url: "/cart/add",
        method: "POST",
        body: {
          eventUuid,
          userEmail,
          ticketQuantity,
        },
      }),
    }),

    makePayment: builder.mutation({
      query: (cartItem) => ({
        url: "user",
        method: "POST", // POST request
        body: cartItem, // sending JSON body
      }),
    }),

    creareEvent: builder.mutation({
      query: (formData, placeUuid) => ({
        url: "/event/create-event",
        method: "POST",
        body: formData,
        placeUuid,
      }),
    }),

    eventFilter: builder.query({
      query: () => ({
        url: "/event/filter",
        method: "GET",
      }),
    }),

    registerFilter: builder.query({
      query: () => ({
        url: "/register-place/filter",
        method: "GET",
      }),
    }),

    payment: builder.mutation({
      query: ({ userEmail }) => ({
        url: "/api/payment/create-payment-intent",
        method: "POST",
        body: {
          userEmail,
        },
      }),
    }),

    success: builder.query({
      query: (sessionId) => ({
        url: `/api/payment/success?session_id=${sessionId}`,
        method: "GET",
      }),
    }),

    getSelectedEvent: builder.query({
      query: ({
        eventName = null,
        category = null,
        city = null,
        startDate = "",
        endDate = "",
      }) =>
        `/event/filter?eventName=${eventName}&category=${category}&city=${city}&startDate=${startDate}&endDate=${endDate}`,
    }),

    addCartData: builder.mutation({
      query: ({ eventUuid, userEmail, ticketQuantity }) => ({
        url: "/cart/add",
        method: "POST",
        body: {
          eventUuid,
          userEmail,
          ticketQuantity,
        },
      }),
    }),

    buyData: builder.mutation({
      query: ({ userEmail, quantity, eventUuid }) => ({
        url: "/api/payment/create-payment-intent",
        method: "POST",
        body: {
          eventUuid,
          userEmail,
          quantity,
        },
      }),
    }),

    checkStatus: builder.mutation({
      query: ({ email }) => ({
        url: "/organizer/check-status",
        method: "POST",
        body: {
          email,
        },
      }),
    }),

    getPlace: builder.query({
      query: () => "/register-place/filter",
    }),

    refund: builder.mutation({
      query: ({ userEmail, eventUuid }) => ({
        url: "/api/payment/refund",
        method: "POST",
        body: {
          userEmail,
          eventUuid,
        },
      }),
    }),

    getUserHistory: builder.mutation({
      query: ({ email = "" }) => ({
        url: `/api/payment/get-user-history?email=${email}`,
      }),
    }),

    updateEvent: builder.mutation({
      query: (formfile) => ({
        url: "/event/update",
        method: "PUT",
        body: formfile,
      }),
    }),

    getApprovalDashboard: builder.query({
      query: ({ email, status }) => ({
        url: `/event/get-organizer-data?email=${email}&status=${status}`,
        method: "GET",
      }),
    }),

    cancelEvent: builder.mutation({
      query: ({ eventUuid, description }) => ({
        url: "/event/cancel",
        method: "POST",
        body: {
          eventUuid,
          description,
        },
      }),
    }),

    organizerHistory: builder.query({
      query: ({ email, status }) => ({
        url: `/event/payout?email=${email}&status=${status}`,
        method: "GET",
      }),
    }),

    organizerPayment: builder.query({
      query: (eventUuid) => ({
        url: `/api/payment/organizer-payment-intent?eventUuid=${eventUuid}`,
        method: "GET",
      }),
    }),

    organizerSuccess: builder.query({
      query: (sessionId) => ({
        url: `/api/payment/organizer-success?sessionId=${sessionId}`,
        method: "GET",
      }),
    }),

    getPayoutEvent: builder.query({
      query: ({ email = "", status = "" }) =>
        `/event/payout?email=${email}&status=${status}`,
    }),
    getEventAdmin: builder.query({
      query: (city) => ({
        url: `/event/filter?city=${city}`,
        method: "GET",
      }),
    }),
    getOrganizerData: builder.query({
      query: () => ({
        url: "/api/v1/admin/organizer-apply-data",
        method: "GET",
      }),
    }),
    getEventData: builder.query({
      query: () => ({
        url: "/api/v1/admin/event-data",
        method: "GET",
      }),
    }),
    organizerApproval: builder.query({
      query: ({ email, status }) => ({
        url: `/api/v1/admin/organizer-approval?email=${email}&status=${status}`,
        method: "GET",
      }),
    }),
    eventApproval: builder.query({
      query: ({ uuid, status }) => ({
        url: `/api/v1/admin/event-approval?eventUuid=${uuid}&status=${status}`,
        method: "GET",
      }),
    }),
    getOrganizerHistory: builder.query({
      query: ({ status = "" }) =>
        `/api/payment/organizer-event-history?status=${status}`,
    }),
    adminBlogView: builder.mutation({
      query: (data) => ({
        url: "/blog/update",
        method: "PUT",
        body: data,
      }),
    }),

    getOrganizerPayment: builder.query({
      query: (uuid) => 
        `/api/payment/organizer-get-payment?eventUuid=${uuid}`
    }),
    getOrganizerPaymentSuccess:builder.query({
      query:(sessionId) =>
        `api/payment/organizer-get-payment-success?sessionId=${sessionId}`
    }),


    addNewPlace:builder.mutation({
      query:(data)=>({
        url:"/register-place/add-place",
        method:"POST",
        body:data
      }),
      
    }),
    viewPayment: builder.query({
      query: ({placeUuid=''}) => 
        `/api/payment/place-payment-data?placeUuid=${placeUuid}`
    }),
    unPaidPayment: builder.query({
      query: ({placeUuid=''}) => 
        `/api/payment/place-payment-all?placeUuid=${placeUuid}`
    }),
    getTotalPayment:builder.query({
      query: () => "/api/payment/event-overview",
    }),
  }),
});

export const {
  useViewPaymentQuery,
  useUnPaidPaymentQuery,
  useGetTotalPaymentQuery,
  useAddNewPlaceMutation,
  useGetOrganizerPaymentSuccessQuery,
  useGetOrganizerHistoryQuery,
  useGetEventAdminQuery,
  useEventApprovalQuery,
  useOrganizerApprovalQuery,
  useGetEventDataQuery,
  useGetOrganizerDataQuery,
  useGetPayoutEventQuery,
  useGetOrganizerPaymentQuery,
  useUpdateEventMutation,
  useGetApprovalDashboardQuery,
  useCancelEventMutation,
  useGetPlaceUuidQuery,
  useGetOtpMutation,
  useVerifyOtpMutation,
  useStoreDataMutation,
  useLoginUserMutation,
  useLoginWithOtpMutation,
  useUpdateDataMutation,
  useLoginOtpMutation,
  useProfilePicMutation,
  useCarouselInfoQuery,
  useBlogSectionQuery,
  useUpdateProfileMutation,
  useProfileDataMutation,
  useCartDataMutation,
  useBecomeOrganizerMutation,
  useRemoveEventMutation,
  useUpdateQuantityMutation,
  useCheckStatusMutation,
  useAddToCartMutation,
  useMakePaymentMutation,
  useCreareEventMutation,
  useEventFilterQuery,
  useRegisterFilterQuery,
  usePaymentMutation,
  useGetSelectedEventQuery,
  useGetPlaceQuery,
  useSuccessQuery,
  useAddCartDataMutation,
  useBuyDataMutation,
  useRefundMutation,
  useGetUserHistoryMutation,
  useOrganizerHistoryQuery,
  useOrganizerPaymentQuery,
  useOrganizerSuccessQuery,
  useAdminBlogViewMutation
} = postsApi;
