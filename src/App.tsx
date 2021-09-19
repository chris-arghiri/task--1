import { FunctionComponent } from 'react';
import styles from './App.module.css';

import FilterInput from './components/FilterInput';
import UserForm from './components/Form';
import UsersLayout from './components/UsersLayout';

const App: FunctionComponent = () => {
  return (
    <div className={styles.App}>
      <FilterInput />
      <UsersLayout />
      <UserForm />
    </div>
  );
};

export default App;
