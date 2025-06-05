import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // ⬅️ энэ нэмэх хэрэгтэй

import { getForm } from "../../api"

import Connect from './types/Connect';
import Date from './types/Date';
import MultipleChoice from './types/MultipleChoice';
import MultipleChoiceGrid from './types/MultipleChoiceGrid';
import Swap from './types/Swap';
import TextAnswer from './types/TextAnswer';
import Time from './types/Time';

export default function FillForm() {
  const { formId } = useParams(); // ⬅️ URL-с formId-г авна
  const [form, setForm] = useState({ forms: [] });

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;
      console.log("User ID эсвэл formId алга байна:", userId, formId);

    if (!userId || !formId) {
      console.log("User ID эсвэл formId алга байна:", userId, formId);
      return;
    }

    async function fetchData() {
      try {
        const res = await getForm(userId, formId); // ⬅️ зөв userId, formId дамжуулна
        setForm(res.data);
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      }
    }

    fetchData();
  }, [formId]);

  return (
    <div>
      <h2>ViewForm</h2>

      {Object.entries(form.forms).map(([formName, type], index) => (
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
