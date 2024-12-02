import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/slices/authSlice';
import { store } from '@/app/redux/store';

const SessionExpiryCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const state = store.getState();
    const sessionExpiry = state.auth.sessionExpiry;
    const isLoggedIn = state.auth.isLoggedIn;

    if (sessionExpiry && Date.now() > sessionExpiry) {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
};

export default SessionExpiryCheck;
