
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import ProjectDetails from "@/pages/ProjectDetails";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ProjectForm from "@/pages/ProjectForm";
import NotFound from "@/components/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LandingPage from "@/pages/LandingPage";
import Properties from "@/pages/Properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/landing/*" element={<LandingPage />} />
        
        {/* Main app routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/project/new" element={<ProjectForm />} />
                <Route path="/admin/project/:id" element={<ProjectForm />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
