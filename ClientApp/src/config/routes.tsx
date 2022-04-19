import { Route, Routes } from 'react-router-dom';
import Home from '../ui/pages/Home';
import Profile from '../ui/pages/Profile';
import { Paths } from '../types/common';

export const routes = <Routes>
  <Route path={ Paths.home } element={ <Home /> } />
  <Route path={Paths.profile} element={ <Profile /> } />
  <Route path={Paths.logout} />
</Routes>
