import { useState } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ResendVerfiyEmail() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    email: '',
  });
  const [loadingResend, setLoadingResend] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const onChange = (e) => {
    setIsError(false);
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResendverification = async () => {
    setLoadingResend(true);
    setIsError(false);
    setErrorMessage('');
    const response = await fetch(
      'https://books.sann-erp.com/api/auth/resend-verification-email',
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
      setErrorMessage('');
      navigate(-1);
      setLoadingResend(false);
      setIsError(false);
    } else {
      setErrorMessage(data?.message);
      setLoadingResend(false);
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
          Resend verification email
        </Typography>
        <TextField
          label=""
          variant="outlined"
          size="medium"
          name="email"
          value={Data.email}
          onChange={onChange}
          fullWidth
          placeholder="Email"
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
          onClick={handleResendverification}
          loading={loadingResend}
          disabled={loadingResend}
          fullWidth
          size="large"
          sx={{
            borderRadius: '10px',
            padding: '10px',
            textTransform: 'capitalize',
          }}
        >
          Resend
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(-1);
          }}
          fullWidth
          size="large"
          sx={{
            borderRadius: '10px',
            padding: '10px',
            textTransform: 'capitalize',
          }}
        >
          Go back
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

export default ResendVerfiyEmail;
