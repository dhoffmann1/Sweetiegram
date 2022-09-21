import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MainPage from './components/mainPage'
import { authenticate } from './store/session';
import UserProfilePage from './components/UserProfilePage'
import YourProfilePage from './components/YourProfilePage';
import CreatePostForm from './components/CreatePostForm';
import PageNotFound from './components/PageNotFound';
import SplashPage from './components/SplashPage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const loggedInUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // // added here
  // useEffect(()=>{
  //   dispatch()
  // }, [dispatch])

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      {loggedInUser && <NavBar />}
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path='/profile'>
          <YourProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId'>
          <UserProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/posts/new'>
          <CreatePostForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <MainPage />
        </ProtectedRoute>
        {/* <Route exact path= '/unknown'>
          <PageNotFound/>
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
