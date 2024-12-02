import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { authReducer } from '@/app/redux/slices/authSlice';
import autoLogoutMiddleware from './autoLogoutMiddleware'; // auto logout middleware

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  autoLogoutMiddleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(autoLogoutMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };


// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage
// import { authReducer } from '@/app/redux/slices/authSlice';
// import autoLogoutMiddleware from './autoLogoutMiddleware'; // auto logout middleware


// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'], 
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//   },
//   autoLogoutMiddleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(autoLogoutMiddleware),
// });

// const persistor = persistStore(store);

// export { store, persistor };




// // import { configureStore } from '@reduxjs/toolkit';
// // import { persistStore, persistReducer } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage'; 
// // // import eventReducer from './slices/EventSlice';
// // import { authReducer } from '@/app/redux/slices/authSlice';
// // import { combineReducers } from 'redux';

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // };

// // const rootReducer = combineReducers({
// //   auth: authReducer
// // });

// // const persistedReducer = persistReducer(persistConfig, rootReducer);

// // export const store = configureStore({
// //   reducer: persistedReducer,
// // });

// // export const persistor = persistStore(store);

