import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import WrapperLayout from './components/WrapperLayout';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Details = React.lazy(() => import('./pages/Details/Details'));
const Favourites = React.lazy(() => import('./pages/Favourites/Favourites'));

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <WrapperLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </WrapperLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
