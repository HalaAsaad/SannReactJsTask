import react from 'react';
import { Box, Typography, Card, Stack, Divider, Slider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import LanguageIcon from '@mui/icons-material/Language';
import EastIcon from '@mui/icons-material/East';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ReactECharts from 'echarts-for-react';
function Dashboard() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const cardsData = [
    {
      title: 'Total Profit',
      value: '$8,943.00',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          class="svg-primary total-profit-svg main-dashboard-cards-svg"
          viewBox="0 0 24 24"
          width="24px"
          fill="#175787"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"></path>
          <circle cx="16" cy="12" r="1.5"></circle>
        </svg>
      ),
    },
    {
      title: 'Total Orders',
      value: '5,472.00',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="svg-secondary total-order-svg main-dashboard-cards-svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="rgb(187, 186, 66)"
        >
          <g>
            <rect fill="none" height="24" width="24"></rect>
            <path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"></path>
          </g>
        </svg>
      ),
    },
    {
      title: 'Total Sales',
      value: '4,406.00',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          class="svg-warning total-sales-svg main-dashboard-cards-svg"
          viewBox="0 0 24 24"
          width="24px"
          fill="#ffcf86"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
        </svg>
      ),
    },
    { title: 'Total Investment', value: '$34K' },
  ];
  const tasksData = [
    {
      title: 'To Do',
      subTitle: '2m ago',
      value: '10.06.2020',
      icon: <ShowChartIcon sx={{ color: 'rgb(78, 98, 177)', width: '18px' }} />,
      color: 'rgb(78, 98, 177)',
      bgColor: 'rgb(78, 98, 177, .3)',
    },
    {
      title: 'Task In Progress',
      subTitle: '2m ago',
      value: '10.06.2020',
      icon: <KeyboardCommandKeyIcon sx={{ color: '#ffcf86', width: '18px' }} />,
      color: '#ffcf86',
      bgColor: '#ffcf8655',
    },
    {
      title: 'Completed Task',
      subTitle: '2m ago',
      value: '10.06.2020',
      icon: <LanguageIcon sx={{ color: '#e46f0e', width: '18px' }} />,
      color: '#e46f0e',
      bgColor: '#e46f0e55',
    },
    {
      title: 'To Do',
      subTitle: '2m ago',
      value: '10.06.2020',
      icon: <ShowChartIcon sx={{ color: '#0f9e86', width: '18px' }} />,
      color: '#0f9e86',
      bgColor: '#0f9e8655',
    },
  ];
  const OptionSales = {
    color: ['#4deeea', '#2d8487', '#f9f871'],
    textStyle: {
      fontFamily: 'Poppins',
      fontSize: '12px',
      color: '#7B91B0',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    stroke: {
      width: [0, 0, 2],
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
      },
    },
    legend: {
      data: ['Active Orders', 'Completed Orders', 'Sales Revenue'],
      bottom: 20,
      borderRadius: 50,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 30,
      textStyle: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: '#222B45',
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    ],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name: 'Active Orders',
        type: 'bar',
        barGap: 0,
        //  label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [104, 102, 117, 146, 118, 115, 220, 103, 83, 114, 265, 174],
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        name: 'Completed Orders',
        type: 'bar',
        //label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [92, 75, 123, 111, 196, 122, 159, 102, 138, 136, 62, 240],
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        name: 'Sales Revenue',
        type: 'line',
        data: [35, 52, 86, 65, 102, 70, 152, 87, 55, 92, 170, 80],
      },
    ],
  };

  const renderCard = (ele) => (
    <Card
      sx={{
        boxShadow: 'unset',
        padding: '1.7rem !important',
        flex: 1,
        border: '1px solid rgba(0, 0, 0, .05)',
        background: '#f1f1f1aa',
        height: '167px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ width: '100%' }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="column" spacing={0}>
          <Typography variant="subtitle2" color="primary">
            {ele.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#585656',
              fontFamily: 'Rajdhani,sans-serif',
            }}
          >
            {ele.value}
          </Typography>
          <Typography variant="caption" sx={{ color: '#7987a1' }}>
            Current Month
          </Typography>
        </Stack>
        {ele.icon}
      </Box>
    </Card>
  );
  const renderCardWithTitle = (title, content) => (
    <Card
      sx={{
        boxShadow: 'unset',
        flex: 1,
        border: '1px solid rgba(0, 0, 0, .05)',
        background: '#f1f1f1aa',
      }}
    >
      <Box
        p={2}
        display={'flex'}
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: '1px solid #dee2e6' }}
      >
        <Typography
          fontSize="15px"
          fontWeight={500}
          variant="subtitle2"
          sx={{ color: '#5d6162' }}
        >
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: '#7987a1' }}>
          View All
        </Typography>
      </Box>
      <Box p={2}>{content}</Box>
    </Card>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageTitle title="Dashboard" items={['Pages', 'Dashboard']} />
      <Box
        display={'flex'}
        justifyContent="space-between"
        flexDirection={desktop ? 'row' : 'column'}
      >
        <Box sx={{ width: desktop ? '74%' : '100%' }}>
          <Grid sx={{ width: '100%' }} container spacing={2}>
            {cardsData.map((ele, i) => (
              <Grid size={{ sm: 12, md: 6, lg: 3 }} key={i}>
                {renderCard(ele)}
              </Grid>
            ))}

            <Grid size={{ sm: 12 }}>
              {renderCardWithTitle(
                'Sales Report',
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    {[
                      {
                        label: 'Active Orders',
                        value: '106',
                        val2: '+0.12%',
                        color: '#0f9e86',
                        bgColor: '#0f9e8655',
                      },
                      {
                        label: 'Completed Orders',
                        value: '420',
                        val2: '+0.24%',
                        color: '#0f9e86',
                        bgColor: '#0f9e8655',
                      },
                      {
                        label: 'Sales Revenue',
                        value: '$32,124.00',
                        val2: '-0.24%',
                        valueColor: '187, 186, 66',
                        color: '#d6573c',
                        bgColor: '#d6573c33',
                      },
                    ]?.map((ele, i) => (
                      <Stack key={i} direction="column">
                        <Typography
                          sx={{ color: '#585656' }}
                          variant="subtitle2"
                        >
                          {ele?.label}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              color: ele?.valueColor || 'rgb(78, 98, 177)',
                            }}
                            variant="caption"
                          >
                            {ele?.value}
                          </Typography>
                          <ArrowDropUpIcon sx={{ color: ele?.color }} />
                          <Typography
                            variant={'caption'}
                            sx={{
                              display: 'inline-block',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '3px 6px',
                              fontWeight: 400,
                              lineHeight: 1,
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              verticalAlign: 'baseline',
                              borderRadius: '3px',
                              color: ele.color,
                              background: ele.bgColor,
                            }}
                          >
                            {ele.val2}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Box>
                  <ReactECharts option={OptionSales} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: desktop ? '24%' : '100%' }}>
          <Grid sx={{ width: '100%' }} container spacing={1}>
            <Grid size={{ sm: 12 }}>
              {renderCardWithTitle(
                'TASKS',
                <>
                  {tasksData?.map((ele, i) => (
                    <Grid container mb={1} p={1} spacing={1}>
                      <Grid
                        key={i}
                        size={{ sm: 2 }}
                        sx={{ padding: '0px !important' }}
                      >
                        <Box
                          sx={{
                            borderRadius: '50%',
                            width: '32px !important',
                            height: '32px !important',
                            fontSize: '12px !important',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: ele?.bgColor,
                            padding: '5px',
                          }}
                        >
                          {ele?.icon}
                        </Box>
                      </Grid>
                      <Grid
                        sx={{ padding: '0px !important' }}
                        container
                        size={{ sm: 10 }}
                        spacing={0}
                      >
                        <Grid size={{ sm: 12 }}>
                          <Box display={'flex'} justifyContent="space-between">
                            <Typography
                              sx={{ color: '#585656' }}
                              variant={'subtitle2'}
                            >
                              {ele.title}
                            </Typography>
                            <Typography
                              variant={'caption'}
                              sx={{
                                display: 'inline-block',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0px 6px',
                                fontWeight: 400,
                                lineHeight: 1,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                verticalAlign: 'baseline',
                                borderRadius: '3px',
                                color: ele.color,
                                background: ele.bgColor,
                              }}
                            >
                              <EastIcon
                                sx={{
                                  color: ele.color,
                                  width: '10px',
                                  marginRight: '2px',
                                }}
                              />
                              {ele.value}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ sm: 12 }}>
                          <Typography
                            sx={{ color: '#7987a1', fontSize: '12px' }}
                            variant="caption"
                          >
                            {ele?.subTitle}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
            <Grid size={{ sm: 12 }}>
              {renderCardWithTitle(
                'Profits By Country',
                <Box>
                  <Box display="flex" flexDirection="column">
                    {[
                      {
                        label: 'India',
                        value: '$21,234.90',
                        color: 'rgb(78, 98, 177)',
                        bgColor: '#0f9e8655',
                      },
                      {
                        label: 'Usa',
                        value: '+$14,256',
                        color: 'rgb(187, 186, 66)',
                        bgColor: '#0f9e8655',
                      },
                      {
                        label: 'Russia',
                        value: '$32,124.00',
                        valueColor: '187, 186, 66',
                        color: '#43ce85',
                        bgColor: '#d6573c33',
                      },
                      {
                        label: 'Uae',
                        value: '-$4,345.69',
                        valueColor: '187, 186, 66',
                        color: '#ffb67b',
                        bgColor: '#d6573c33',
                      },
                      {
                        label: 'China',
                        value: '-$4,345.69',
                        color: '#7891ef',
                        bgColor: '#d6573c33',
                      },
                    ]?.map((ele, i) => (
                      <Stack key={i} direction="column">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            sx={{ color: '#585656' }}
                            variant="subtitle2"
                          >
                            {ele?.label}
                          </Typography>
                          <Typography
                            sx={{ color: ele.color }}
                            variant="subtitle2"
                          >
                            {ele?.value}
                          </Typography>
                        </Box>
                        <Slider
                          color={ele.color}
                          size="small"
                          defaultValue={70}
                          aria-label="Small"
                          valueLabelDisplay="auto"
                          sx={{
                            '& .MuiSlider-track': {
                              background: ele.color,
                            },
                            '& .MuiSlider-thumb': {
                              display: 'none',
                            },
                          }}
                        />
                      </Stack>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
