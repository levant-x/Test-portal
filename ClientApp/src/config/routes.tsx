import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { Paths } from './types';

export const routes = <Routes>
  <Route path={ Paths.home } element={ <Home /> } />
  <Route path={Paths.profile} element={ <Profile /> } />
  <Route path={Paths.logout} />
</Routes>
