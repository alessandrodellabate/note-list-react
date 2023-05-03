import { useEffect, useId, useRef, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Button from "./Button";

const Modal = NiceModal.create(
  ({
    title,
    subtitle,
    action,
    note = {
      title: "",
      description: "",
    },
  }) => {
    const [inputs, setInputs] = useState(note);
    const [save, setSave] = useState(false);
    const titleRef = useRef(null);
    const modal = useModal();
    const titleInputId = useId();
    const descriptionInputId = useId();

    useEffect(() => {
      if (titleRef.current) titleRef.current.focus();
    }, []);

    const handleSave = () => {
      if (action === "Salva" || action === "Aggiorna") {
        modal.resolve(inputs);
      } else if (action === "Elimina") {
        modal.resolve(note);
      }
      setSave(true);
    };

    const handleCancel = () => {
      modal.remove();
    };

    const handleOnChangeInput = (e) => {
      setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
    };

    return (
      <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-black/70 text-black/80">
        <div className="w-80 divide-gray-300 break-keep rounded-xl bg-gray-100 p-6 sm:w-[600px]">
          <h1 className="mb-2 text-center text-2xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mb-2 text-center">{subtitle}</p>
          {(action === "Salva" || action === "Aggiorna") && (
            <div>
              <div className="mb-3">
                <label htmlFor={titleInputId} className="text-md">
                  Titolo
                </label>
                <input
                  ref={titleRef}
                  id={titleInputId}
                  name="title"
                  className="w-full rounded-md border border-[silver] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-600"
                  type="text"
                  value={inputs.title}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={descriptionInputId} className="text-md">
                  Descrizione
                </label>
                <textarea
                  id={descriptionInputId}
                  name="description"
                  rows={5}
                  className="mt-1 w-full rounded-md border border-[silver] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-600"
                  type="text"
                  value={inputs.description}
                  onChange={handleOnChangeInput}
                />
              </div>
              {action === "Aggiorna" && (
                <div className="text-right">
                  <small>
                    Ultimo aggiornamento:{" "}
                    {new Date(inputs.updatedAt).toLocaleString()}
                  </small>
                </div>
              )}
            </div>
          )}
          <div className="mt-8 grid grid-cols-2 gap-16">
            <Button
              name={action}
              onClick={handleSave}
              disabled={save || !inputs.title || !inputs.description}
            />
            <Button name="Annulla" onClick={handleCancel} />
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
