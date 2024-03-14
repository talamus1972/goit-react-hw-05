import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formValue = evt.target.name.value.trim();
    onSubmit(formValue);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}
