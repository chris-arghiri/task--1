import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch } from '../../reduxUtils/hooks';
import { filterByJob } from '../../reduxUtils/usersSlice';
import styles from './FilterInput.module.css';
import { Input, Button } from 'antd';

const FilterInput: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const [filteredValue, setFilteredValue] = useState<string>('');

  const onChangeInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = value.currentTarget.value.toString();
    setFilteredValue(currentValue);
  };

  const onClickFilterByJob = () => {
    dispatch(filterByJob(filteredValue));
  };

  return (
    <div className={styles.FilterInput}>
      <Input
        placeholder='Search by job'
        onChange={(value) => onChangeInput(value)}
      />
      <Button
        type='primary'
        onClick={onClickFilterByJob}
        style={{ marginLeft: '0.25em' }}>
        Filter by Job
      </Button>
    </div>
  );
};

export default FilterInput;
