import { Box, Typography, Breadcrumbs } from '@mui/material';
function PageTitle({ title, items }) {
  return (
    <Box
      sx={{ width: '100%' }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <Typography
        sx={{ textIndent: '-1px', lineHeight: 2 }}
        variant="h6"
        fontWeight="500"
        color="primary"
      >
        {title}
      </Typography>
      <Breadcrumbs separator="››" aria-label="breadcrumb">
        {items?.map((ele, i) => (
          <Typography
            key={i}
            variant="subtitle2"
            color={items.length === i + 1 ? 'primary' : 'font_gray'}
          >
            {ele}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default PageTitle;
