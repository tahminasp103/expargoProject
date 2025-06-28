// // src/redux/api/ticketApiSlice.js
// import { apiSlice } from './ApiSlice';

// export const ticketApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getMyTickets: builder.query({
//       query: () => '/api/tickets/my', // token artıq `apiSlice`də əlavə olunur
//     }),
//     createTicket: builder.mutation({
//       query: (ticketData) => ({
//         url: '/api/tickets',
//         method: 'POST',
//         body: ticketData,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetMyTicketsQuery,
//   useCreateTicketMutation
// } = ticketApiSlice;
