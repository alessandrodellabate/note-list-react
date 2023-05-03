import NiceModal from "@ebay/nice-modal-react";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Note from "./components/Note";

import { useNotes } from "./useNotes";
import { v4 as uuid } from "uuid";
import "./styles.css";

export default function App() {
  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotes();

  function getNoteIndex(e) {
    return Array.from(e.target.parentElement.parentNode.children).indexOf(
      e.target.parentElement
    );
  }

  const showAddModal = async () => {
    const note = await NiceModal.show(Modal, {
      title: "Aggiungi una nuova nota",
      subtitle: "Inserisci un titolo e una descrizione",
      action: "Salva",
    });

    addNote({
      id: uuid().split("-")[0],
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const showEditModal = async (e) => {
    const index = getNoteIndex(e);
    const note = await NiceModal.show(Modal, {
      title: "Modifica la nota",
      subtitle: "Aggiorna i campi titolo e/o descrizione",
      action: "Aggiorna",
      note: notes[index],
    });

    updateNote({
      ...note,
      updatedAt: new Date(),
    });
  };

  const showDeleteModal = async (e) => {
    const index = getNoteIndex(e);
    const { id } = await NiceModal.show(Modal, {
      title: "Conferma eliminazione",
      subtitle: `La nota "${notes[index].id}" sarà eliminata in maniera definitiva`,
      action: "Elimina",
      note: notes[index],
    });

    deleteNote({ id });
  };

  if (isLoading) return <div></div>;

  return (
    <div className="bg-white p-4 text-black/80 sm:mx-16 sm:my-8 sm:rounded-lg sm:p-8 sm:shadow">
      <h1 className="text-center text-4xl font-extrabold tracking-tighter">
        Note-List
      </h1>
      <p className="mb-6 text-center text-lg text-gray-500">
        Elenco delle note
      </p>
      <div className="grid place-items-center sm:absolute sm:right-24 sm:top-16">
        <Button name="Aggiungi" onClick={showAddModal} />
      </div>
      <ul className="mt-4 space-y-4 divide-y">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              title={note.title}
              description={note.description}
              onClickEdit={showEditModal}
              onClickDelete={showDeleteModal}
            />
          );
        })}
      </ul>
    </div>
  );
}
