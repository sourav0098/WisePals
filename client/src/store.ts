import { configureStore } from "@reduxjs/toolkit";
import { searchBarReducer as searchBar } from "./features/searchTutors/index";
import tutorSlice from "./features/addTutor/store/tutorSlice";
import tutorProfileSlice from "./features/showTutorProfile/store/tutorProfileSlice";
import reviewSlice from "./features/reviews/store/reviewSlice";
import { authenticationReducer as userSession } from "./features/authentication/index";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface RootState {
  searchBar: ReturnType<typeof searchBar>;
  tutorSlice: ReturnType<typeof tutorSlice>;
  tutorProfileSlice: ReturnType<typeof tutorProfileSlice>;
  session: ReturnType<typeof session>;
  reviewSlice: ReturnType<typeof reviewSlice>;
  
}

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['session']
}

const session = persistReducer(persistConfig, userSession)

export const store = configureStore<RootState>({
  reducer: { searchBar, tutorSlice, tutorProfileSlice, reviewSlice, session}
});

 const persistor = persistStore(store)

 export {persistor}