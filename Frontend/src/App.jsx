import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';                // required
import './index.css';

import Navbar from './components/Navbar/Navbar';                 // components that calling
import CreateForm from './pages/CreateForm/CreateForm';
import ViewResponses from './pages/ViewResponses/ViewResponses';
import Auth from './pages/auth/auth';
import ViewForm from "./pages/fillForm/fillForm"
   
import { ScrollSmoother } from "gsap/ScrollSmoother";           // ari's thing
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

function App() {
    const [logged, setLogged] = useState(() => {
      return localStorage.getItem("logged") === "true";
    });
        
    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true
    });
  }, []);
  
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<CreateForm logged={logged}/>} />
              <Route path="/create" element={<CreateForm logged={logged}/>} />
              <Route path="/responses/:formId" element={<ViewResponses />} />
              <Route path="/auth" element={<Auth setLogged={setLogged} logged={logged} />} />
              <Route path="/fill" element={<ViewForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;