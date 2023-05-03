import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "./Button";

const Note = ({ title, description, onClickEdit, onClickDelete }) => {
  return (
    <li className="flex flex-wrap items-center gap-4 rounded p-4 shadow">
      <div className="w-full sm:w-auto sm:grow">
        <p className="mb-2 truncate text-lg font-extrabold">{title}</p>
        <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
      </div>
      <Button name="Modifica" onClick={onClickEdit} />
      <Button name="Elimina" onClick={onClickDelete} />
    </li>
  );
};

export default Note;
