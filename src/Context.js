import React, { createContext, useContext, useState } from "react";



const Session = createContext();

const Context = ({ children }) => {

    const [session, setSession] = useState(false)

    const [loading, setLoading] = useState(false);
 


  return (
    <Session.Provider value={{ session, setSession, setLoading, loading }}>
      {children}
    </Session.Provider>
  );
};

export const SessionState = () => {
  return useContext(Session);
};

export default Context;