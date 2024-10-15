import { useToast } from "vue-toastification";
import Swal, { type SweetAlertOptions } from "sweetalert2";

const toast = useToast();

/**
 * Show alert message success
 * @param {string} text message show alert
 */
const handleFinishSuccess = (text: string) => toast.success(text);

/**
 *
 * @param {string} infoError
 */
const handleFinishError = (infoError: string) => toast.error(infoError);

/**
 * Toast question
 * @author LeoVillalobos
 * @param {string} text
 * @param {string} title
 * @param {string} icon
 * @returns response confirm or cnacel action
 */
const toastQuestion = async (text: string, title: string = "", icon: string = "info") => {
  const result = await Swal.fire({
    title: title,
    showDenyButton: true,
    icon: icon,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
    confirmButtonColor: "#249e93",
    cancelButtonColor: "#c95252",
    customClass: "sweetAlert-load sweetAlert2",
    html: `<h1><b>${text}</b></h1>`
  } as SweetAlertOptions);
  if (result.isConfirmed) {
    return true;
  } else if (result.isDenied) {
    return false;
  }
};

/**
 *
 * @author LVillalobos
 * @param {string} title
 * @param {string} text
 * @returns
 */
const SwalLoad = (title: string = "", text: string = "") => {
  // Swal.fire({
  //   title: title,
  //   text: text,
  //   imageUrl: "/images/gifs/Loading_icon.gif",
  //   showConfirmButton: false,
  //   allowOutsideClick: false,
  //   customClass: "sweetAlert-load sweetAlert2"
  // });
};

export { toastQuestion, SwalLoad, handleFinishSuccess, handleFinishError };
