import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/Navbar/Navbar.jsx";
import Login from "../src/Auth/Login.jsx";
import Register from "../src/Auth/Register.jsx";
import NoPage from "../src/NoPage/NoPage.jsx";
import PrivateRoutes from "./PrivateRoutes.js";
import POReportMember from "./PO/POReportMember.jsx";
import POReportKPI from "./PO/POReportKPI.jsx";
import POReportProduct from "./PO/POReportProduct.jsx";
import POMainPage from "./PO/POMainPage.jsx";
import PMOMainPage from "./PMO/PMOMainPage.jsx";
import PMOReportMember from "./PMO/PMOReportMember.jsx";
import PMOReportKPI from "./PMO/PMOReportKPI.jsx";
import PMOReportProduct from "./PMO/PMOReportProduct.jsx";
import PMOMasterUser from "./PMO/PMOMasterUser.jsx";
import PMOMasterProduct from "./PMO/PMOMasterProduct.jsx";
import PMOMasterUserProduct from "./PMO/PMOMasterUserProduct.jsx";
import MemberMainPage from "./Member/MemberMainPage.jsx";

export default function Nav() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes allowedRoles={["Product Owner"]} />}>
          <Route path="/po-report-member" element={<POReportMember />} />
          <Route path="/po-report-kpi" element={<POReportKPI />} />
          <Route path="/po-report-product" element={<POReportProduct />} />
          <Route path="/po-main-page" element={<POMainPage />} />
        </Route>

        <Route element={<PrivateRoutes allowedRoles={["PMO"]} />}>
          <Route path="/pmo-main-page" element={<PMOMainPage />} />
          <Route path="/pmo-report-member" element={<PMOReportMember />} />
          <Route path="/pmo-report-kpi" element={<PMOReportKPI />} />
          <Route path="/pmo-report-product" element={<PMOReportProduct />} />
          <Route path="/pmo-master-user" element={<PMOMasterUser />} />
          <Route path="/pmo-master-product" element={<PMOMasterProduct />} />
          <Route path="/pmo-master-user-product" element={<PMOMasterUserProduct />} />
        </Route>

        <Route element={<PrivateRoutes allowedRoles={["Member"]} />}>
          <Route path="/member-main-page" element={<MemberMainPage />} />
        </Route>

        <Route path="/navbar" element={<Navbar />} />
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Nav />, document.getElementById('root'));
