import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../../lib/axios";
import { API_ENDPOINTS } from "../../../utils/apiEndpoints";

interface ReviewArgs {
    values: {
      tutorId: string;
      userId: string;
      rating: number;
      review: string;
    };
  }

interface ReviewState {
    reviews: any;
    loading: boolean;
    error: any;
}

// Get Reviews
export const getReviews = createAsyncThunk("get/reviews", async (tutorId: string) => {
  try{
    const response = await axios.get(`${API_ENDPOINTS.REVIEWS}/tutor/${tutorId}`);
    return response.data;
  }catch(err){
    console.log(err);
  }
});


// Post Review
export const addReview = createAsyncThunk("add/review", async (review: ReviewArgs) => {
    try{
        const response = await axios.post(`${API_ENDPOINTS.REVIEWS}`, review,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }catch(err){
        console.log(err);
    }
});

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: null,
        loading: false,
        error: null,
    } as ReviewState,
    reducers: {},
    extraReducers: {
        [getReviews.pending.type]:(state:ReviewState) => {
            state.loading = true;
        },
        [getReviews.fulfilled.type]:(state:ReviewState,action:PayloadAction<any>) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [getReviews.rejected.type]:(state:ReviewState,action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addReview.pending.type]:(state:ReviewState) => {
            state.loading = true;
        },
        [addReview.fulfilled.type]:(state:ReviewState,action:PayloadAction<any>) => {
            state.loading = false;
        },
        [addReview.rejected.type]:(state:ReviewState,action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export default reviewSlice.reducer;