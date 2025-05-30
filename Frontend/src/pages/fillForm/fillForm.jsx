import { useState, useEffect } from 'react';
import axios from 'axios';

import Rtype1 from './types/rtype1';
import Rtype2 from './types/Rtype2';
import Rtype3 from './types/Rtype3';
import Rtype4 from './types/Rtype4';
import Rtype5 from './types/Rtype5';
import Rtype6 from './types/Rtype6';
import Rtype7 from './types/Rtype7';

export default function fillForm() {
  const [data, setData] = useState({ forms: {} });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8000/users/data");
        setData(res.data);
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>ViewForm</h2>
      {Object.entries(data.forms).map(([formName, type], index) => (
        <div key={index}>
          <strong>{formName}</strong>: {type}
          {type === "type1" && <Rtype1 />}
          {type === "type2" && <Rtype2 />}
          {type === "type3" && <Rtype3 />}
          {type === "type4" && <Rtype4 />}
          {type === "type5" && <Rtype5 />}
          {type === "type6" && <Rtype6 />}
          {type === "type7" && <Rtype7 />}
        </div>
      ))}
    </div>
  );
}
