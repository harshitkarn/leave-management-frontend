import { createContext } from "react";

const CurrentPageContext = createContext({
  currentPageIndex: 0,
  setCurrentPageIndex: (index) => {}
});

export default CurrentPageContext;