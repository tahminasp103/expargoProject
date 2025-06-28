import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCurrency:localStorage.getItem('currency') || 'AZN',
    exchangeRate:1.7,
};
const currencySlice=createSlice({
    name:"currency",
    initialState,
    reducers:{
        setCurrency:(state,action)=>{
            state.selectedCurrency=action.payload
            localStorage.setItem('currency' , action.payload)
        },
    },
});
export const {setCurrency} = currencySlice.actions;
export default currencySlice.reducer;