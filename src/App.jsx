import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserRoutes from "./routes/User/UserRoutes";
import AdminRoutes from "./routes/Admin/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
