import { FunctionComponent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './reduxUtils/hooks';
import { Button, Input, Form } from 'antd';
import './App.css';
import {
  fetchUsers,
  usersSelectors,
  addUser,
  deleteUser,
  usersAddMany,
  usersAddOne,
  User,
  usersRemoveOne,
  filterByJob
} from './reduxUtils/usersSlice';

const inputsPlaceholders = [
  { placeholder: 'Name' },
  { placeholder: 'Email' },
  { placeholder: 'City' },
  { placeholder: 'Job' },
  { placeholder: 'PhoneNumber' }
];

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(usersSelectors.selectAll);
  const defaultUser = {
    id: -1,
    Name: '',
    Email: '',
    City: '',
    Job: '',
    PhoneNumber: ''
  };
  const [form] = Form.useForm();

  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [user, setUser] = useState<User>(defaultUser);

  const [filteredValue, setFilteredValue] = useState<string>('');

  const setUserValuesViaPlaceholder = (
    placeholder: string,
    currentValue: string
  ) => {
    // switch(placeholder) {
    //   case 'Name':

    // }
    if (placeholder === 'Name') {
      setName(currentValue);
      return name;
    } else if (placeholder === 'Email') {
      setEmail(currentValue);
      return email;
    } else if (placeholder === 'City') {
      setCity(currentValue);
      return city;
    } else if (placeholder === 'Job') {
      setJob(currentValue);
      return job;
    } else if (placeholder === 'PhoneNumber') {
      setPhoneNumber(currentValue);
      return phoneNumber;
    } else return null;
  };

  const handleOnSubmit = () => {
    dispatch(addUser(user));
    dispatch(usersAddOne(user));
    setUser(defaultUser);
    form.resetFields();
  };

  const handleOnDelete = (id: number) => {
    dispatch(deleteUser(id));
    dispatch(usersRemoveOne(id));
  };

  useEffect(() => {
    const asyncThunk = async () => {
      const users = await dispatch(fetchUsers());
      if (fetchUsers.fulfilled.match(users)) {
        dispatch(usersAddMany(users as any));
      }
    };
    asyncThunk();

    allUsers !== null ? setId(allUsers.length + 1) : setId(-1);

    setUser({
      id: id,
      Name: name,
      Email: email,
      City: city,
      Job: job,
      PhoneNumber: phoneNumber
    });
  }, [
    dispatch,
    allUsers,
    id,
    name,
    email,
    city,
    job,
    phoneNumber,
    filteredValue
  ]);

  return (
    <div className='App'>
      <Input
        placeholder='Filter by job'
        onChange={(value) => {
          const currentValue = value.currentTarget.value.toString();
          setFilteredValue(currentValue);
        }}
      />
      <Button
        onClick={() => {
          dispatch(filterByJob(filteredValue));
        }}>
        Filter
      </Button>
      {allUsers.map((user) => {
        if (user !== null)
          return (
            <div key={`user-${user.id}`} className='User'>
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

      <Form
        form={form}
        style={{ display: 'flex', flexDirection: 'column', padding: '2em' }}
        onFinish={handleOnSubmit}>
        {inputsPlaceholders.map(({ placeholder }, index) => {
          return (
            <Form.Item
              key={`input-${index}`}
              label={placeholder}
              name={placeholder}
              rules={[
                {
                  required: true,
                  message: `Please input your ${placeholder.toLowerCase()}`
                }
              ]}>
              <Input
                onChange={(value) => {
                  const currentValue = value.currentTarget.value.toString();
                  setUserValuesViaPlaceholder(placeholder, currentValue);
                }}
              />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Add new user
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
