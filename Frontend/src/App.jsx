import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateForm from './pages/CreateForm/CreateForm';
import ViewResponses from './pages/ViewResponses/ViewResponses';
import './index.css';
import Auth from './pages/auth/auth';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/responses/:formId" element={<ViewResponses />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;