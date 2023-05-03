import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "./components/Modal";
import { useModal } from "@ebay/nice-modal-react";
import axios from "axios";

export const useNotes = () => {
  const queryClient = useQueryClient();
  const modal = useModal(Modal);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3500",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => axiosInstance.get("notes"),
  });

  const notes = data?.data;

  const { mutate: addNote } = useMutation({
    mutationFn: (note) => axiosInstance.post("notes", note),
    onSuccess: ({ data: newNote }) => {
      /* AVOID A NEW GET */
      setTimeout(() => {
        queryClient.setQueryData(["notes"], (oldNotes) => {
          return {
            ...oldNotes,
            data: [...oldNotes.data, newNote],
          };
        });
        modal.remove();
      }, 200);
    },
  });

  const { mutate: updateNote } = useMutation({
    mutationFn: (note) => axiosInstance.put(`notes/${note.id}`, note),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["notes"]);
        modal.remove();
      }, 200);
    },
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: ({ id }) => axiosInstance.delete(`notes/${id}`),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["notes"]);
        modal.remove();
      }, 200);
    },
  });

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
  };
};
