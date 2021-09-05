import {createContext} from 'react';

export default createContext({
  username: '',
  setUsername: (username: string) => {},
});
