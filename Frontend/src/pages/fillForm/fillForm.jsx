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

export default function fillForm() {
  const { formId } = useParams();
  const [form, setForm] = useState(null); // эхний төлөв null байна

  async function fetchData() {
    try {
      const res = await getForm(formId);
      console.log("FORM:", res); // res = { title, description, ... }
      setForm(res);
    } catch (err) {
      console.error("Алдаа гарлаа:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [formId]);

  // ⬇️ form null байвал "Loading..." гэж харуул
  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      <form>
        {form.questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <label>{q.question}</label><br />
            {q.type === 1 && <Rtype1 question={q} />}
            {q.type === 2 && <Rtype2 question={q} />}
            {q.type === 3 && <Rtype3 question={q} />}
            {q.type === 4 && <Rtype4 question={q} />}
            {q.type === 5 && <Rtype5 question={q} />}
            {q.type === 6 && <Rtype6 question={q} />}
            {q.type === 7 && <Rtype7 question={q} />}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}
