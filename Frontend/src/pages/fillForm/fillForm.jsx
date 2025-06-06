import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Rtype1 from "./types/MultipleChoice";
import Rtype2 from "./types/Connect"
import Rtype3 from "./types/Swap"
import Rtype4 from "./types/TextAnswer"
import Rtype5 from "./types/MultipleChoiceGrid"
import Rtype6 from "./types/Date"
import Rtype7 from "./types/Time"


import { getForm } from "../../api";

export default function FillForm() {
  const { formId } = useParams();
  const [form, setForm] = useState(); 

  async function fetchData() {
    try {
      const res = await getForm(formId);
      console.log(res)
      setForm(res);
    } catch (err) {
      console.error("Алдаа гарлаа:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [formId]);
  console.log(form)
    if (!form) return <p>Loading...</p>;
  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description} 12</p>
    

    </div>
  );
}
