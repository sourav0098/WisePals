import axios from "../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

//First argument: prefix for the generated action type
//Generates action that will be taken by the SearchBar extra reducers
export default createAsyncThunk("tutors/fetchTutors", async (skill) => {
  try {
    const response = await axios.get(API_ENDPOINTS.TUTORS + "?skill=" + skill);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
});
