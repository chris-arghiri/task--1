import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch } from '../../reduxUtils/hooks';
import { Input, Button } from 'antd';
import { filterByJob } from '../../reduxUtils/usersSlice';

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
    <>
      <Input
        placeholder='Search by job'
        onChange={(value) => onChangeInput(value)}
      />
      <Button onClick={onClickFilterByJob}>Filter by Job</Button>
    </>
  );
};

export default FilterInput;
