import { useState, useEffect } from 'react';

export function useUser() {
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token){
      setIsAuthentificated(false)
      return
    }
    setIsAuthentificated(true)
  },[]);

  return [isAuthentificated, setIsAuthentificated];
}