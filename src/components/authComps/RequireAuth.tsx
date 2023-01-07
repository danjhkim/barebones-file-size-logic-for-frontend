import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	auth: object | null;
	children: React.ReactElement;
}

const RequireAuth: React.FC<Props> = ({ auth, children }) => {
	return auth ? children : <Navigate to='/' />;
};

export default RequireAuth;
