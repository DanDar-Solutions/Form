import { useState, useEffect } from 'react';               // required things
import axios from 'axios';
import meme from '../../public/meme.webp';                  // eniigaa ustgaarai ari

import Connect from './types/Connect';                       // components types
import Date from './types/Date';
import MultipleChoice from './types/MultipleChoice';
import MultipleChoiceGrid from './types/MultipleChoiceGrid';
import Swap from './types/Swap';
import TextAnswer from './types/TextAnswer';
import Time from './types/Time';

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

      <img src={meme} alt="meme" />
      <h1>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>  {/* <h1>bbbbbbbbbbbbbbbbbbbbbbbbbb</h1> */}

      {Object.entries(data.forms).map(([formName, type], index) => (
        <div key={index}>
          <strong>{formName}</strong>: {type}
          {type === "type1" && <Connect />}
          {type === "type2" && <Date />}
          {type === "type3" && <MultipleChoice />}
          {type === "type4" && <MultipleChoiceGrid />}
          {type === "type5" && <Swap />}
          {type === "type6" && <TextAnswer />}
          {type === "type7" && <Time />}
        </div>
      ))}
    </div>
  );
}
