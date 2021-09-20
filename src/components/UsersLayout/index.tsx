import { FunctionComponent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../reduxUtils/hooks';
import {
  deleteUser,
  usersRemoveOne,
  fetchUsers,
  usersAddMany,
  usersSelectors
} from '../../reduxUtils/usersSlice';
import { Button } from 'antd';
import styles from './UsersLayout.module.css';

const UsersLayout: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelectors.selectAll);

  const handleOnDelete = (id: number) => {
    dispatch(deleteUser(id));
    dispatch(usersRemoveOne(id));
  };

  const asyncThunk = async () => {
    const users = await dispatch(fetchUsers());
    dispatch(usersAddMany(users as any));
  };

  useEffect(() => {
    asyncThunk();
  }, []);

  return (
    <div className={styles.Users}>
      <Button type='primary' onClick={asyncThunk}>
        Get Users
      </Button>
      <div className={styles.UsersHead}>
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>City</h3>
        <h3>Job</h3>
        <h3>PhoneNumber</h3>
      </div>
      {users.map((user) => {
        if (user !== null)
          return (
            <div key={`user-${user.id}`} className={styles.UsersLayout}>
              <p>{user.Name}</p>
              <p>{user.Email}</p>
              <p>{user.City}</p>
              <p>{user.Job}</p>
              <p>{user.PhoneNumber}</p>
              <Button
                type='primary'
                danger
                onClick={() => {
                  if (user.id !== null) return handleOnDelete(user.id);
                }}>
                Delete
              </Button>
            </div>
          );
        else return null;
      })}
    </div>
  );
};

export default UsersLayout;
