import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import { MainPage, ComicsPage, SingleComicPage } from "../pages";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

//выношу в импорт по умолчанию для ленивой подгрузки
//динамические импорты должны быть ниже статических
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() =>
  import("../pages/SingleCharacterPage/SingleCharacterPage")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          {/* для обработки ошибок при ленивой загрузке */}
          {/* fallback выводит компонент, пока подгружается lazy компонент*/}
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicPage} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterPage}
                    dataType="character"
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
