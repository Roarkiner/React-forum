import { toast } from "react-toastify";

export function displayDefaultToastError() {
    toast.error("Un problème est survenu, veuillez rafraichir la page.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    });
}