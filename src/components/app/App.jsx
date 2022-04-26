import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

// import { MainPage, ComicsPage, SingleComicPage} from "../pages";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/singlePage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:id' element={<SinglePage type='comic' />} />
              <Route path='/characters/:id' element={<SinglePage type='char' />} />

              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>

        </main>
      </div>
    </Router>
  )
}

export default App;