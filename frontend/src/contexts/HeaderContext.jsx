import { createContext, useContext, useState } from "react";

const HeaderContext = createContext()

export function HeaderProvider({children}){
  const [headerTitle, setHeaderTitle] = useState(null)

  return (
    <HeaderContext.Provider value={{headerTitle, setHeaderTitle}} >
      {children}
    </HeaderContext.Provider>

  )
}

export function useHeaderTitle(){
  const {headerTitle, setHeaderTitle} = useContext(HeaderContext)

  return {headerTitle, setHeaderTitle}
}