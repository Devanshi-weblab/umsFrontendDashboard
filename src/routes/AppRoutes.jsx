import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import UniversityOperations from "../components/UniversityOperations";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/university-operations" element={<UniversityOperations />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
