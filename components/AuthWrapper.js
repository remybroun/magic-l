import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useUser} from '../hooks/useUser';

const AuthWrapper = ({ children }) => {
	const router = useRouter()
	const [isAuthentificated, setIsAuthentificated] = useUser()


	useEffect(() => {

		const token = localStorage.getItem("jwt"); 
		if (!token && window.location.pathname !== '/auth/login'){
			router.push("/auth/login")

		}
		
	}, [])


	return (
		<div>
      <main className="mb-auto">{children}</main>
		</div>
	)
}

export default AuthWrapper