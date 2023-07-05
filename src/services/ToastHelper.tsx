import { toast } from "react-toastify";

export function displayDefaultToastError() {
    displayCustomToastError("Un problème est survenu, veuillez rafraichir la page.");
}

export function displayCustomToastError(message: string) {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    });
}