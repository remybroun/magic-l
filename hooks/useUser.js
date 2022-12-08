import { useState, useEffect } from 'react';

export function useUser() {
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  useEffect(() => {
    console.log("checking if isAuthentificated")
    const token = localStorage.getItem("jwt");
    console.log(token)
    if (!token){
      setIsAuthentificated(false)
      return
    }
    setIsAuthentificated(true)
  });

  return [isAuthentificated, setIsAuthentificated];
}