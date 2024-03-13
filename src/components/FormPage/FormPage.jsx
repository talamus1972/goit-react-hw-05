import { Formik, Form, Field } from "formik";
import css from "./FormPage.module.css";
import { useSearchParams } from "react-router-dom";


export default function FormPage({ onSearch }) {
const [params, setParams] = useSearchParams();
  const value = params.get("owner") ?? "";
  console.log(value);
  const changeSearch = (search) => {
    params.set("owner", search)
    setParams(params)
  } 


  return (
    <div>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.name);
          actions.resetForm();
        }}
      >
        <Form>
          <Field type="text" name="name" />
          <button className={css.btn} type="search">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
}
