import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import authReducer from './slice/userAuthSlice';

const persistConfig = {
    key: 'E-com_root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    userAuth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);
export default store;