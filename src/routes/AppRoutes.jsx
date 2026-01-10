import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/LoginComponents/Login"
import UniversityOperations from "../components/UniversityDashboard/UniversityOperations";
import LiveProjectTable from "../components/LiveProject/LiveProjectTable";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/university-operations" element={<UniversityOperations />} />
        <Route path="/live-project" element={<LiveProjectTable />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
