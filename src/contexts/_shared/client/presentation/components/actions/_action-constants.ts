export type ButtonType = "submit" | "danger" | "default";

export const actionStyles = (type: ButtonType) => [
    "rounded-md px-4 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer",
    {"text-white    bg-[#6faab5]  hover:bg-[#5f9ea8]  focus-visible:outline-[#6faab5]": type === "submit"},
    {"text-white    bg-red-600    hover:bg-red-500    focus-visible:outline-red-600": type === "danger"},
    {"text-gray-800 bg-gray-200   hover:bg-gray-300   focus-visible:outline-gray-400": type === "default"},
    "disabled:opacity-50 disabled:cursor-not-allowed",
];

export const DISABLED_SUBMIT_TOOLTIP_MESSAGE = "No se han hecho cambios que puedan guardarse.";
