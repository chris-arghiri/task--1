import { FunctionComponent, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './Form.module.css';
import {
  addUser,
  usersAddOne,
  usersSelectors,
  User
} from '../../reduxUtils/usersSlice';
import { useAppDispatch, useAppSelector } from '../../reduxUtils/hooks';

const inputsPlaceholders = [
  { placeholder: 'Name' },
  { placeholder: 'Email' },
  { placeholder: 'City' },
  { placeholder: 'Job' },
  { placeholder: 'PhoneNumber' }
];

const defaultUser = {
  id: -1,
  Name: '',
  Email: '',
  City: '',
  Job: '',
  PhoneNumber: '',
  DateCreated: ''
};

const UserForm: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelectors.selectAll);

  const [form] = Form.useForm();

  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [user, setUser] = useState<User>(defaultUser);

  const setUserValuesViaPlaceholder = (
    placeholder: string,
    currentValue: string
  ) => {
    switch (placeholder) {
      case 'Name':
        setName(currentValue);
        return name;
      case 'Email':
        setEmail(currentValue);
        return email;
      case 'City':
        setCity(currentValue);
        return city;
      case 'Job':
        setJob(currentValue);
        return job;
      case 'PhoneNumber':
        setPhoneNumber(currentValue);
        return phoneNumber;
      default:
        return null;
    }
  };

  const handleOnSubmit = () => {
    dispatch(addUser(user));
    dispatch(usersAddOne(user));
    setUser(defaultUser);
    form.resetFields();
  };

  useEffect(() => {
    const currentDate = new Date();
    users !== null ? setId(users.length + 20) : setId(-1);

    setUser({
      id: id,
      Name: name,
      Email: email,
      City: city,
      Job: job,
      PhoneNumber: phoneNumber,
      DateCreated: currentDate.getDate().toString()
    });
  }, [id, name, email, city, job, phoneNumber, users]);

  return (
    <Form form={form} className={styles.Form} onFinish={handleOnSubmit}>
      {inputsPlaceholders.map(({ placeholder }, index) => {
        return (
          <Form.Item
            key={`input-${index}`}
            name={placeholder}
            rules={[
              {
                required: true,
                message: `Please input your ${placeholder.toLowerCase()}`
              }
            ]}>
            <Input
              placeholder={placeholder}
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
          Add user
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
