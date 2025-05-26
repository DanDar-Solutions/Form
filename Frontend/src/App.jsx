import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateForm from './pages/CreateForm/CreateForm';
import ViewResponses from './pages/ViewResponses/ViewResponses';
import './index.css';
import Auth from './pages/auth/auth';


import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

function App() {
    const [logged, setLogged] = useState(false)
    


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
              <Route path="/create" element={<CreateForm />} />
              <Route path="/responses/:formId" element={<ViewResponses />} />
              <Route path="/auth" element={<Auth setLogged={setLogged} logged={logged} />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;