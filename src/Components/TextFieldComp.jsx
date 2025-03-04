import { Typography, Stack, TextField } from '@mui/material';

function TextFieldComp({ label, name, value, onChange, ...rest }) {
  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <TextField
        label=""
        variant="outlined"
        size="small"
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        {...rest}
      />
    </Stack>
  );
}
export default TextFieldComp;
