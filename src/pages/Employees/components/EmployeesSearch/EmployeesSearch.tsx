import { SyntheticEvent, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useDebounce } from 'use-debounce';

type EmployeesSearchProps = {
  onChange: (value: string) => void;
  className?: string
};

export const EmployeesSearch = (props: EmployeesSearchProps) => {
  const { onChange, className } = props;

  const [search, setSearch] = useState('');
  const [debouncedValue, { cancel, flush }] = useDebounce(search, 200);

  useEffect(() => {
    onChange(debouncedValue);

    // cancel state change on component unmount
    return cancel;
  }, [debouncedValue, cancel, onChange])

  const handleSearchChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value || '';
    setSearch(value);

    // react immediately when user clears search
    if (!value) {
      flush();
    }
  };

  return (
    <Input
      className={className}
      value={search}
      onChange={handleSearchChange}
      placeholder="Search..."
    />
  );
};
