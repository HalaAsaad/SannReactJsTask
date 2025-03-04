import { useState, useContext } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

function Login() {
  const { setToken } = useContext(AppContext);
  const [Data, setData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // https://vitejsvitekyvjsa3a-bgwz--5173--31ca1d38.local-credentialless.webcontainer.io/
  const onChange = (e) => {
    setIsError(false);
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setErrorMessage('');
    const response = await fetch('https://books.sann-erp.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'SANN_BOOKS',
      },
      body: JSON.stringify({ email: Data.username, password: Data.password }),
    });
    let data = await response.json();
    console.log('data ', data);
    if (data.success) {
      localStorage.setItem('token', data?.data?.token);
      setToken(data?.data?.token);
      setErrorMessage('');
      window.location.href = '/';
      setLoading(false);
      setIsError(false);
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
          Hello Again!
        </Typography>
        <TextField
          label=""
          variant="outlined"
          size="medium"
          name="username"
          value={Data.username}
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
        <TextField
          label=""
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          variant="outlined"
          size="medium"
          name="password"
          value={Data.password}
          onChange={onChange}
          fullWidth
          placeholder="Password"
          sx={{
            '& .MuiInputBase-input': {
              background: 'none',
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
                  <LockIcon sx={{ color: '#EEEEEE' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
          Login
        </Button>
        <Link
          style={{ textDecoration: 'unset', width: '100%' }}
          to="/forgot-password"
        >
          <Typography
            sx={{
              width: '100%',
              lineHeight: '17px',
              color: '#333333',
              textAlign: 'end',
              textTransform: 'capitalize',
            }}
            variant="body2"
          >
            Forgot Password?
          </Typography>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'unset', width: '100%' }}>
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
            Create new account
          </Typography>
        </Link>
      </Stack>
    </>
  );
}

export default Login;
