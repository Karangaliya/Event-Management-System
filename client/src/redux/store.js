import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import themeSlice from './theme/themeSlice';
import companySlice from './organization/companySlice';
import eventSlice from './event/eventSlice';

// Combine all reducers into one
const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    company: companySlice,
    event: eventSlice
});

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // The key in localStorage where the state will be stored
    storage, // The storage engine to use (localStorage in this case)
    whitelist: ['user', 'theme', 'company'], // List of reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false }),
});

// Create the persistor to persist and rehydrate the state
export const persistor = persistStore(store);

export default store;