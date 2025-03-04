import { useState } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    token: params?.token || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const onChange = (e) => {
    setIsError(false);
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setErrorMessage('');
    const response = await fetch(
      'https://books.sann-erp.com/api/auth/reset-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'SANN_BOOKS',
        },
        body: JSON.stringify({ token: Data.token, password: Data.password }),
      }
    );
    let data = await response.json();
    console.log('data ', data);
    if (data.success) {
      setErrorMessage('');
      setLoading(false);
      setIsError(false);
      navigate('/');
    } else {
      setErrorMessage(data?.message);
      setLoading(false);
      setIsError(true);
      throw Error(await response.text());
    }
  };
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '500px',
          margin: '80px auto',
        }}
      >
        <img
          style={{ margin: '0 auto' }}
          width={100}
          alt="logo"
          src="/sann-icon.jpg"
        />
        <Typography
          sx={{
            fontWeight: '700',
            lineHeight: '31.69px',
            marginBottom: '0px',
            padding: '5px 0px',
            textAlign: 'center',
            width: '100%',
          }}
          variant="h6"
        >
          Reset Password
        </Typography>
        <TextField
          label=""
          variant="outlined"
          size="medium"
          name="token"
          value={Data.token}
          onChange={onChange}
          fullWidth
          placeholder="Token"
          sx={{
            '& .MuiInputBase-input': {
              background: 'none !important',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#EEEEEE',
              },
              '&:hover fieldset': {
                borderColor: '#EEEEEE',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#EEEEEE',
              },
            },
          }}
        />
        <TextField
          label=""
          variant="outlined"
          size="medium"
          name="password"
          value={Data.password}
          onChange={onChange}
          fullWidth
          placeholder="Password"
          sx={{
            '& .MuiInputBase-input': {
              background: 'none !important',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#EEEEEE',
              },
              '&:hover fieldset': {
                borderColor: '#EEEEEE',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#EEEEEE',
              },
            },
          }}
        />
        {IsError && (
          <Typography
            sx={{ color: '#DE0030' }}
            variant="caption"
            display="block"
            gutterBottom
          >
            {ErrorMessage}
            {/* Invalid authentication username or password. */}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          fullWidth
          size="large"
          sx={{
            borderRadius: '10px',
            padding: '10px',
            textTransform: 'capitalize',
          }}
        >
          Reset
        </Button>
        <Link to="/" style={{ textDecoration: 'unset', width: '100%' }}>
          <Typography
            color="secondary"
            sx={{
              width: '100%',
              lineHeight: '17px',
              textAlign: 'center',
              textTransform: 'capitalize',
              margin: '0 auto',
            }}
            variant="body2"
          >
            Login
          </Typography>
        </Link>
      </Stack>
    </>
  );
}

export default ResetPassword;
