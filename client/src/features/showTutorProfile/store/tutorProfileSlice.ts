import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../../lib/axios";
import { API_ENDPOINTS } from "../../../utils/apiEndpoints";

export const getTutorProfile = createAsyncThunk("get/tutorProfile", async (id: string) => {
  try{
    const response = await axios.get(`${API_ENDPOINTS.TUTORS}/${id}`);
    return response.data;
  }catch(err){
    console.log(err);
  }
  
});

interface TutorState {
    tutorProfile: any;
    loading: boolean;
    error: any;
  }

const tutorProfileSLice = createSlice({
    name: "tutorialProfile",
    initialState: {
        tutorProfile: null,
        loading: false,
        error: null,
    } as TutorState,
    reducers: {},
    extraReducers: {
        [getTutorProfile.pending.type]:(state:TutorState) => {
            state.loading = true;
        },
        [getTutorProfile.fulfilled.type]:(state:TutorState,action:PayloadAction<any>) => {
            state.loading = false;
            state.tutorProfile = action.payload;
        },
        [getTutorProfile.rejected.type]:(state:TutorState,action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default tutorProfileSLice.reducer;