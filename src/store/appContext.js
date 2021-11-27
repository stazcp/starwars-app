import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export default function AppContextProvider(props) {
  const [person, setPerson] = useState()

  return <AppContext.Provider value={{ person, setPerson }}>{props.children}</AppContext.Provider>
}
