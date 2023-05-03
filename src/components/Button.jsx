import clsx from "clsx";

const Button = ({ name, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "select-none rounded-md px-4 py-1.5 font-medium tracking-tight hover:opacity-90 disabled:opacity-60",
        name === "Elimina" && "bg-red-500",
        name === "Modifica" && "bg-yellow-500",
        name === "Salva" && "bg-yellow-500",
        name === "Aggiorna" && "bg-yellow-500",
        name === "Aggiungi" && "bg-green-500",
        name === "Annulla" && "bg-gray-200"
      )}
    >
      {name}
    </button>
  );
};

export default Button;
