import { createContext } from "react";

const ToastContext = createContext({
  toastEmit: (msg,typ) => {}
});

export default ToastContext;