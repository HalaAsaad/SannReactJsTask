import { useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [Data, setData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [IsSuccess, setIsSuccess] = useState(false);
  const onChange = (e) => {
    setIsError(false);
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage('');
    const response = await fetch(
      'https://books.sann-erp.com/api/auth/forgot-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'SANN_BOOKS',
        },
        body: JSON.stringify({ email: Data.email }),
      }
    );
    let data = await response.json();
    console.log('data ', data);
    if (data.success) {
      setIsSuccess(true);
      setErrorMessage('');
      setLoading(false);
      setIsError(false);
    } else {
      setIsSuccess(false);
      setErrorMessage(data?.message);
      setLoading(false);
      setIsError(true);
      throw Error(await response.text());
    }
  };
  return (
    <>
      {IsSuccess ? (
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '600px',
            margin: '20px auto',
          }}
        >
          <img
            style={{ margin: '0 auto' }}
            width={100}
            alt="logo"
            src="/sann-icon.jpg"
          />
          <LinearProgress sx={{ width: '100%' }} />
          <Typography
            sx={{
              fontWeight: '700',
              lineHeight: '31.69px',
              marginBottom: '0px',
              padding: '5px 0px',
              textAlign: 'center',
              width: '100%',
            }}
            variant="subtitle2s"
          >
            Please check your email box to reset password.
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '350px',
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
            Forgot Password
          </Typography>
          <TextField
            label=""
            variant="outlined"
            size="medium"
            name="email"
            value={Data.email}
            onChange={onChange}
            fullWidth
            placeholder="Email Address"
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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: '#EEEEEE' }} />
                  </InputAdornment>
                ),
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
            Apply
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
      )}
    </>
  );
}

export default ForgotPassword;
