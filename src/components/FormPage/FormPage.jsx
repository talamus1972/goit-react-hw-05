import { Formik, Form, Field } from "formik";
import css from "./FormPage.module.css";

export default function FormPage({ onSearch }) {
  return (
    <div>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.name);
          console.log(values);
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
