import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../components/UserContext';

export function logoutCurrentUser(): void {
  const {setUsername} = useContext(UserContext);
  setUsername('');

  const history = useHistory();
  history.push('/');
}
