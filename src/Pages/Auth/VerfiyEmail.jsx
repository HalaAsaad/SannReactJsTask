import { useState, useContext } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';

function VerfiyEmail() {
  const params = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    token: params?.token || '',
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
      'https://books.sann-erp.com/api/auth/verfiy-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'SANN_BOOKS',
        },
        body: JSON.stringify({ token: Data.token }),
      }
    );
    let data = await response.json();
    console.log('data ', data);
    if (data.success) {
      setToken(data?.data?.token);
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
          Verfiy Email
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
          Verfiy Email
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate('/resend-verification-email');
          }}
          fullWidth
          size="large"
          sx={{
            borderRadius: '10px',
            padding: '10px',
            textTransform: 'capitalize',
          }}
        >
          Resend verification email
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

export default VerfiyEmail;
