import { Picture } from "../types/general.types";
import useData from "./useData";

const randomWords = [
    "Underwater",
    "Fall Colors",
    "Hallowen Costumes",
    "Autumnal Equinox",
    "Abstract",
    "Night",
    "Underwater",
    "Nature",
    "Beautiful Zoom Backgrounds",
    "Orange Kiss"
];

const randomIndex = Math.floor(Math.random() * randomWords.length);

const usePictures = () => useData<Picture>('search?query=' + randomWords[randomIndex]);

export default usePictures;