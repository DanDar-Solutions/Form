import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateForm from './pages/CreateForm/CreateForm';
import FillForm from './pages/FillForm/FillForm';
import ViewResponses from './pages/ViewResponses/ViewResponses';
import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/fill/:formId" element={<FillForm />} />
          <Route path="/responses/:formId" element={<ViewResponses />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

