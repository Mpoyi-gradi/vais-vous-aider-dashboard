import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import CateringForm from "./pages/CateringForm";
import TrainingForm from "./pages/TrainingForm";
import RentalForm from "./pages/RentalForm";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";

function App() {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, isAdmin: boolean = false) => {
    const userData = { email, isAdmin };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        <Navbar user={user} logout={logout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth login={login} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/catering" element={<CateringForm />} />
            <Route path="/services/training" element={<TrainingForm />} />
            <Route path="/services/rental" element={<RentalForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route 
              path="/dashboard" 
              element={user?.isAdmin ? <Dashboard /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;