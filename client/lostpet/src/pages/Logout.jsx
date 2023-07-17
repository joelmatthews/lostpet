import { redirect } from 'react-router-dom';

export const action = () => {
    console.log('REMOVING TOKEN AND REDIRECTING TO /');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');
};