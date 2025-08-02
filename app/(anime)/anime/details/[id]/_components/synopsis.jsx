"use client";

import { toast } from "sonner";
import { useReducer } from "react";
import { useIsClient } from "usehooks-ts";
import { MdOutlineTranslate } from "react-icons/md";

// Initial state
const initialState = {
  originalText: "",
  translatedText: "",
  isTranslated: false,
  isLoading: false,
  hasTranslated: false,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_ORIGINAL":
      return { ...state, originalText: action.payload };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "TRANSLATE_SUCCESS":
      return {
        ...state,
        translatedText: action.payload,
        isTranslated: true,
        hasTranslated: true,
        isLoading: false,
      };
    case "TOGGLE_TRANSLATION":
      return { ...state, isTranslated: !state.isTranslated };
    case "TRANSLATE_ERROR":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export const Synopsis = ({ synopsis = "" }) => {
  const isClient = useIsClient();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    originalText: synopsis.replace(/\[Written by MAL Rewrite\]/, ""),
  });

  const handleTranslate = async () => {
    if (!isClient) return;

    if (state.isTranslated) {
      dispatch({ type: "TOGGLE_TRANSLATION" });
      return;
    }

    if (state.hasTranslated) {
      dispatch({ type: "TOGGLE_TRANSLATION" });
      return;
    }

    dispatch({ type: "START_LOADING" });

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: state.originalText,
          to: "id",
        }),
      });

      if (!res.ok) throw new Error("Terjemahan gagal");
      const data = await res.json();

      dispatch({
        type: "TRANSLATE_SUCCESS",
        payload: data.translatedText || "[Terjemahan tidak tersedia]",
      });
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menerjemahkan");
      dispatch({ type: "TRANSLATE_ERROR" });
    }
  };

  return (
    <div>
      <p className="mb-2 leading-relaxed text-gray-800 dark:text-gray-300">
        {state.isTranslated ? state.translatedText : state.originalText}{" "}
        <button
          onClick={handleTranslate}
          title="Terjemahkan"
          className="ml-2 inline-flex items-center hover:text-blue-600"
        >
          <MdOutlineTranslate />
          {state.isTranslated ? " Lihat Asli" : " Terjemahkan"}
        </button>
      </p>
      {state.isLoading && (
        <small className="text-sm text-gray-500">Menerjemahkan...</small>
      )}
    </div>
  );
};
