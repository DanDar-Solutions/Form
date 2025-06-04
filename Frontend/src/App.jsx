import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';                // required
import './index.css';

import Navbar from './components/Navbar/Navbar';                 // components that calling
import CreateForm from './pages/CreateForm/CreateForm';
import ViewResponses from './pages/ViewResponses/ViewResponses';
import Auth from './pages/auth/auth';
import FillForm from "./pages/fillForm/fillForm"
import Home from "./pages/home/home";

import { ScrollSmoother } from "gsap/ScrollSmoother";           // ari's thing
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

function App() {
    const [formId, setFormId] = useState(null);
    const [logged, setLogged] = useState(() => {
      return localStorage.getItem("logged") === "true";
    });
        
    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true});
    }, []);
    useEffect(()=> {
      console.log(formId)
    })
  
  return (
    <>
    <Navbar />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="app">
          <main>
            <Routes>
              <Route path="/" element={<Home logged={logged}/>} />
              <Route path="/create" element={<CreateForm logged={logged} setFormId={setFormId}/>} />
              <Route path="/responses/:formId" element={<ViewResponses />} />
              <Route path="/auth" element={<Auth setLogged={setLogged} logged={logged} />} />
              <Route path="/fill/:formId" element={<FillForm/>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;