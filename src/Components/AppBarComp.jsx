import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  IconButton,
  Box,
  OutlinedInput,
  InputAdornment,
  Switch,
  Badge,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.menu_color,
  borderBottom: '1px solid rgba(0, 0, 0, .05)',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  backgroundColor: '#efefef1a', //'#f1f1f1',
  boxShadow: 'unset',
  borderBottom: '2px solid rgba(0, 0, 0, .05)',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: 1300,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);
  const [openSettingDrawer, setOpenSettingDrawer] = React.useState(false);
  const [menuDirection, setMenuDirection] = React.useState({
    Horizontal: false,
    Vertical: true,
  });

  React.useEffect(() => {
    if (menuDirection.Horizontal) {
      setOpen(false);
    }
  }, [menuDirection.Horizontal]);

  const handleToggleSettingDrawer = () => {
    setOpenSettingDrawer(!openSettingDrawer);
  };
  const handleCloseSettingDrawer = () => {
    setOpenSettingDrawer(false);
  };
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  const navItems = [
    {
      label: 'Dashboard',
      to: '/',
      icon: (
        <HomeOutlinedIcon color={pathname === '/' ? 'primary' : 'font_gray'} />
      ),
    },
    {
      label: 'Users',
      to: '/users',
      icon: (
        <PeopleOutlinedIcon
          color={pathname === '/users' ? 'primary' : 'font_gray'}
        />
      ),
    },
  ];
  const renderSideBarDrawer = (
    <>
      <SideDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{ width: '100%' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              width="50px"
              alt="logo"
              // src={'../src/assets/react.svg'}
              src={'/sann-icon.jpg'}
            />
            {open && (
              <Typography fontWeight="700" variant="subtitle1" ml={1}>
                SANN
              </Typography>
            )}
          </Box>
        </DrawerHeader>
        <Divider />
        {open && (
          <Typography
            variant="caption"
            color="font_gray"
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '.5px',
              marginBlockEnd: '12px',
              height: '15px',
              paddingBlock: 0,
              paddingInlineStart: '25px',
              paddingInlineEnd: '20px',
              opacity: '.6',
              paddingTop: '15px',
            }}
          >
            MAIN
          </Typography>
        )}
        <List>
          {navItems?.map((ele, i) => (
            <Link to={ele.to} key={i} style={{ textDecoration: 'unset' }}>
              <ListItem key={i} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: 'initial' }
                      : { justifyContent: 'center' },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: 'center' },
                      open ? { mr: 1 } : { mr: 'auto' },
                    ]}
                  >
                    {ele?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={pathname === ele.to ? 'primary' : 'font_gray'}
                        variant="subtitle2"
                      >
                        {ele?.label}
                      </Typography>
                    }
                    color={pathname === ele.to ? 'primary' : 'font_gray'}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                            color: theme.palette.font_gray.main,
                          }
                        : { opacity: 0 },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </SideDrawer>
    </>
  );
  let padding = menuDirection.Horizontal
    ? '70px !important'
    : '20px !important';
  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#efefef1a' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              paddingLeft: padding,
              paddingRight: padding,
              background: '#fff',
            }}
          >
            {menuDirection.Vertical ? (
              <IconButton
                size="small"
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={[
                  open && { marginRight: 2 },
                  !open && { marginLeft: 7, marginRight: 2 },
                  // open && { display: 'none' }
                ]}
              >
                {open ? (
                  <FormatAlignLeftIcon color="font_gray" />
                ) : (
                  <CloseOutlinedIcon color="font_gray" />
                )}
              </IconButton>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center">
                <img
                  width="70px"
                  alt="logo"
                  // src={'../src/assets/react.svg'}
                  src={'/sann-icon.jpg'}
                />
              </Box>
            )}
            <OutlinedInput
              size="small"
              placeholder="Search"
              sx={{ width: '35%', marginLeft: '15px' }}
              endAdornment={
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <Badge
              sx={{
                marginLeft: 'auto',
                marginRight: '20px',
                '& .MuiBadge-badge': {
                  backgroundColor: 'rgb(187, 186, 66, 0.3) !important',
                  color: theme.palette.secondary.main,
                },
              }}
              badgeContent={4}
              color="secondary"
            >
              <ShoppingCartOutlinedIcon color="action" sx={{ width: '18px' }} />
            </Badge>
            <Badge
              sx={{
                marginRight: '20px',
                '& .MuiBadge-badge': {
                  backgroundColor: 'rgb(187, 186, 66, 0.3) !important',
                  color: theme.palette.secondary.main,
                },
              }}
              badgeContent={2}
              color="secondary"
            >
              <EmailOutlinedIcon color="action" sx={{ width: '18px' }} />
            </Badge>
            <Avatar sx={{ width: 34, height: 34 }} alt="user" src="/user.png" />
            <IconButton
              size="small"
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleSettingDrawer}
              edge="start"
              sx={{ marginLeft: '10px' }}
            >
              <SettingsOutlinedIcon color="font_gray" sx={{ width: '22px' }} />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              onClick={handleLogout}
              edge="start"
              sx={{ marginLeft: '10px' }}
            >
              <LogoutOutlinedIcon color="font_gray" sx={{ width: '20px' }} />
            </IconButton>
          </Toolbar>
          {menuDirection.Horizontal && !menuDirection.Vertical && (
            <Toolbar
              sx={{
                background: '#f1f1f1',
                width: '100%',
                paddingLeft: padding,
                paddingRight: padding,
              }}
              position="fixed"
            >
              <Box display="flex" alignItems="center">
                {navItems.map((ele, i) => (
                  <Link to={ele.to} key={i} style={{ textDecoration: 'unset' }}>
                    <Stack mr={3} key={i} spacing={1} direction="row">
                      {ele?.icon}
                      <Typography
                        variant="subtitle2"
                        color={pathname === ele.to ? 'primary' : 'font_gray'}
                      >
                        {ele?.label}
                      </Typography>
                    </Stack>
                  </Link>
                ))}
              </Box>
            </Toolbar>
          )}
        </AppBar>

        {menuDirection.Vertical &&
          !menuDirection.Horizontal &&
          renderSideBarDrawer}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            paddingLeft: padding,
            paddingRight: padding,
            marginTop: menuDirection.Horizontal ? '130px' : '66px',
          }}
        >
          {children}
        </Box>
      </Box>
      {/* Setting drawer */}
      <Drawer
        anchor={'right'}
        open={openSettingDrawer}
        onClose={handleCloseSettingDrawer}
        sx={{ zIndex: 1300 }}
      >
        <Box sx={{ width: 270 }}>
          <Box sx={{ background: 'rgba(0, 0, 0, .03)' }}>
            <Typography
              textTransform="uppercase"
              color={'font_gray'}
              sx={{
                fontSize: '14px',
                paddingBlockEnd: 0,
                textAlign: 'start',
                padding: '10px',
                fontWeight: 600,
                margin: '10px 0 !important',
                marginBlockEnd: '.5rem',
                marginBlockStart: '.5rem',
                borderBlockEnd: '1px solid rgba(0, 0, 0, .05)',
                borderBlockStart: '1px solid rgba(0, 0, 0, .0',
              }}
            >
              Navigation Style
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid size={9}>
              <Typography
                color="font_gray"
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '.5px',
                  marginBlockEnd: '12px',
                  height: '15px',
                  paddingBlock: 0,
                  paddingInlineStart: '25px',
                  paddingInlineEnd: '20px',
                  paddingTop: '15px',
                }}
              >
                Vertical Menu
              </Typography>
            </Grid>
            <Grid size={3}>
              <Switch
                checked={menuDirection.Vertical}
                onChange={(event) => {
                  if (event.target.checked) {
                    setOpen(true);
                  }
                  setMenuDirection({
                    Horizontal: !event.target.checked,
                    Vertical: event.target.checked,
                  });
                }}
              />
            </Grid>
            <Grid size={9}>
              <Typography
                color="font_gray"
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '.5px',
                  marginBlockEnd: '12px',
                  height: '15px',
                  paddingBlock: 0,
                  paddingInlineStart: '25px',
                  paddingInlineEnd: '20px',
                  paddingTop: '15px',
                }}
              >
                Horizontal Click Menu
              </Typography>
            </Grid>
            <Grid size={3}>
              <Switch
                checked={menuDirection.Horizontal}
                onChange={(event) => {
                  //event.target.checked
                  setMenuDirection({
                    Horizontal: event.target.checked,
                    Vertical: !event.target.checked,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
