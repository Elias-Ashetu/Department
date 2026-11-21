
import { Routes, Route } from "react-router-dom";

import { PublicLayout } from './component/layout/public/PublicLayout.jsx';

import { Home } from './Pages/public/home/home.jsx';
import Departments  from './Pages/public/departments/department.jsx';
import  Announcements  from './Pages/public/announcements/announcement.jsx';
import { About } from './Pages/public/about/about.jsx';

 export function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Route>

    </Routes>
  );
}


