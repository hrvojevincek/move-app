import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import WrapperLayout from './components/WrapperLayout';
import MovieSkeletonRow from './components/Skeleton/MovieSkeleton';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Details = React.lazy(() => import('./pages/Details/Details'));
const Favourites = React.lazy(() => import('./pages/Favourites/Favourites'));

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <WrapperLayout>
          <Suspense fallback={<MovieSkeletonRow />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </Suspense>
        </WrapperLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
