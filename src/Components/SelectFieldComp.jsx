import { Typography, Stack, MenuItem, Select } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
// import { useEffect, useState } from 'react';

function SelectFieldComp({
  label,
  name,
  value,
  itemlabel = 'name',
  itemValue = 'id',
  loading,
  disabled,
  onChange,
  applyWhenChange = () => {},
  items,
  ...rest
}) {
  // const [itemVal, setItemVal] = useState(value);
  // useEffect(() => {
  //   setItemVal(value);
  // }, [isUpdate, value]);
  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      {loading ? (
        <LinearProgress />
      ) : (
        <Select
          value={value}
          onChange={(e) => {
            onChange(e);
            if (applyWhenChange) {
              applyWhenChange(e);
            }
          }}
          fullWidth
          name={name}
          disabled={disabled}
          size={'small'}
          // renderValue={(selected) => {
          //   console.log('selected ', selected);
          //   if (selected)
          //     return items?.find((ele) => ele[itemValue] === selected)[itemlabel];
          // }}
          {...rest}
        >
          {items?.map((item, i) => (
            <MenuItem key={i} value={item[itemValue]}>
              {item[itemlabel]}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
}
export default SelectFieldComp;
