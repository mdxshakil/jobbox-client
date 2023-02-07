import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/reusable/Loading";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import routes from "./routes/routes";
import { auth } from "./utils/firebase.config";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.authReducer)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email))
      } else {
        dispatch(toggleLoading())
      }
    })
  }, [dispatch])
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster></Toaster>
    </>
  );
}

export default App;
