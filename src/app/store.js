import { createContext } from 'react';
import userServices from '../services/user.services';

const jwt = localStorage.getItem('JWT');
const userId = localStorage.getItem('userId');
const userEmail = localStorage.getItem('userEmail');

const StoreContext = createContext({
  statistics: [],
  async isValidToken() {
    const user = await userServices.getUser(this.jwt, this.userId);
    console.log(`user: ${JSON.stringify(user)}`);
    return !!user;
  },
  isAuthenticated: false,
  jwt,
  userId,
  userEmail,
});

export default StoreContext;
