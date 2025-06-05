import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // ⬅️ энэ нэмэх хэрэгтэй

import { getForm } from "../../api"

export default function FillForm() {
  const { formId } = useParams(); // ⬅️ URL-с formId-г авна
  const [form, setForm] = useState({ forms: [] });

  async function fetchData() {
    try {
        const res = await getForm(formId); // ⬅️ зөв userId, formId дамжуулна
        setForm(res.data);
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      }
    }

  useEffect(() => {
    fetchData();
    console.log(form)
  }, [formId]);

  return (
    <div></div>
  );
}
