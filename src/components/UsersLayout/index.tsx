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
    <>
      <Button onClick={asyncThunk}>Get Users</Button>
      {users.map((user) => {
        if (user !== null)
          return (
            <div key={`user-${user.id}`} className={styles.UsersLayout}>
              <p>{user.Name}</p>
              <p>{user.Email}</p>
              <p>{user.City}</p>
              <p>{user.Job}</p>
              <p>{user.PhoneNumber}</p>
              <button
                onClick={() => {
                  if (user.id !== null) return handleOnDelete(user.id);
                }}>
                Delete
              </button>
            </div>
          );
        else return null;
      })}
    </>
  );
};

export default UsersLayout;
