import { logout } from "@/app/redux/slices/authSlice";

// Check if the session has expired
const checkSessionExpiry = (store) => {
  const state = store.getState();
  const sessionExpiry = state.auth.sessionExpiry;
  
  // If session has expired, dispatch logout
  if (sessionExpiry && Date.now() > sessionExpiry) {
    store.dispatch(logout());
    window.location.reload()
  }
};

const autoLogoutMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/login") {
    // Store session expiry in state and cookies
    const sessionExpiry = Date.now() + 12 * 60 * 60 * 1000; // 5 minutes from now
    // const sessionExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    store.dispatch({
      type: 'auth/setSessionExpiry',
      payload: sessionExpiry,
    });

    // Store expiry time in cookies as well
    Cookies.set('sessionExpiry', sessionExpiry, { expires: 1 / 2 }); // 5 minutes expiration
  }

  // Every time an action is dispatched, check if the session has expired
  checkSessionExpiry(store);

  return next(action);
};

export default autoLogoutMiddleware;
