import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Box, Stack, Typography, Button, Switch, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import TextFieldComp from '../../Components/TextFieldComp';
import SelectFieldComp from '../../Components/SelectFieldComp';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

function Signup() {
  const [Data, setData] = useState({
    industry_id: undefined, // added
    language: undefined, // added
    organization_name_ar: undefined, // added
    organization_name_en: undefined, // added
    email: undefined, // added
    mobile: undefined, // added
    password: undefined, // added
    country_id: undefined, // added
    country_state_id: undefined, // added
    currency_id: undefined, // added
    time_zone_id: undefined, // added
    street1: undefined, // added
    street2: undefined, // added
    city: undefined, // added
    postal_code: undefined, // added
    registered_for_vat: undefined, // added 0 || 1
    tax_registration_number_label: undefined, // added
    tax_registration_number: undefined, // added
    vat_registered_on: undefined, // added
    plan_id: undefined, // added
    plan_price_id: undefined, // added
    plan_type: 'Monthly',
  });
  const [IsCurrencyUpdated, setIsCurrencyUpdated] = useState(false);
  const [IsTimeZoneUpdated, setIsTimeZoneUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [dataList, setDataList] = useState({
    industries: [],
    countries: [],
    currencies: [],
    timeZones: [],
    plans: [],
    country_states: {},
    plan_prices: {},
  });
  // https://vitejsvitekyvjsa3a-bgwz--5173--31ca1d38.local-credentialless.webcontainer.io/
  const domain = 'https://books.sann-erp.com/';
  useEffect(() => {
    getIndustries();
    getCountries();
    getCurrencies();
    getTimeZones();
    getPlans();
  }, []);
  useEffect(() => {
    if (Data.country_id) {
      let findCountry = dataList.countries.find(
        (ele) => ele.id === Data.country_id
      );
      if (findCountry.id) {
        setDataList((prev) => ({
          ...prev,
          country_states: {
            ...(prev.country_states || {}),
            [Data.country_id]: findCountry.country_states,
          },
        }));
        setData((prev) => ({
          ...prev,
          currency_id: findCountry.currency,
          postal_code: findCountry.code,
          country_state_id: undefined,
          postal_code: undefined,
        }));
      }
      setIsCurrencyUpdated(true);
      setTimeout(() => {
        setIsCurrencyUpdated(false);
      }, 1000);
    }
  }, [Data.country_id, dataList.countries]);
  useEffect(() => {
    if (Data.plan_id) {
      let findPlan = dataList.plans.find((ele) => ele.id === Data.plan_id);
      if (findPlan.id) {
        setDataList((prev) => ({
          ...prev,
          plan_prices: {
            ...(prev.plan_prices || {}),
            [Data.plan_id]: findPlan.prices,
          },
        }));
        setData((prev) => ({
          ...prev,
          plan_price_id: undefined,
        }));
      }
    }
  }, [Data.plan_id, dataList.plans]);

  console.log('dataList ', dataList);
  console.log('Data ', Data);
  const getIndustries = async () => {
    const response = await fetch(domain + 'api/auth/industries', {
      headers: {
        'x-api-key': 'SANN_BOOKS',
      },
    });
    let data = await response.json();
    if (data.success) {
      setDataList((prev) => ({
        ...prev,
        industries: data?.data || [],
      }));
    } else {
      throw Error(await response.text());
    }
  };
  const getCountries = async () => {
    const response = await fetch(domain + 'api/auth/countries', {
      headers: {
        'x-api-key': 'SANN_BOOKS',
      },
    });
    let data = await response.json();
    if (data.success) {
      setDataList((prev) => ({
        ...prev,
        countries: data?.data || [],
      }));
    } else {
      throw Error(await response.text());
    }
  };
  const getCurrencies = async () => {
    const response = await fetch(domain + 'api/auth/currencies', {
      headers: {
        'x-api-key': 'SANN_BOOKS',
      },
    });
    let data = await response.json();
    if (data.success) {
      setDataList((prev) => ({
        ...prev,
        currencies: data?.data || [],
      }));
    } else {
      throw Error(await response.text());
    }
  };
  const getTimeZones = async () => {
    const response = await fetch(domain + 'api/auth/time-zones', {
      headers: {
        'x-api-key': 'SANN_BOOKS',
      },
    });
    let data = await response.json();
    if (data.success) {
      setDataList((prev) => ({
        ...prev,
        timeZones: data?.data || [],
      }));
    } else {
      throw Error(await response.text());
    }
  };
  const getPlans = async () => {
    const response = await fetch(domain + 'api/subscription/plans', {
      headers: {
        'x-api-key': 'SANN_BOOKS',
      },
    });
    let data = await response.json();
    if (data.success) {
      setDataList((prev) => ({
        ...prev,
        plans: data?.data || [],
      }));
    } else {
      throw Error(await response.text());
    }
  };
  const onChange = (e) => {
    setIsError(false);
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage('');
    const body = new FormData();
    Object.keys(Data)?.forEach((key) => {
      if (key === 'registered_for_vat') {
        body.set('registered_for_vat', Data.registered_for_vat ? 1 : 0);
      } else {
        body.set(key, Data[key]);
      }
    });
    const response = await fetch(
      'https://books.sann-erp.com/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'SANN_BOOKS',
        },
        // body,
        body: JSON.stringify({
          ...Data,
          registered_for_vat: Data.registered_for_vat ? 1 : 0,
        }),
      }
    );
    let data = await response.json();
    console.log('data ', data);
    if (data.success) {
      setErrorMessage('');
      setLoading(false);
      setIsError(false);
      setIsSuccess(true);
    } else {
      setErrorMessage(data?.message);
      setLoading(false);
      setIsError(true);
      setIsSuccess(false);
      throw Error(await response.text());
    }
  };
  const renderHeader = (title) => (
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
        letterSpacing: 2,
      }}
    >
      {title}
    </Typography>
  );
  const Fields_Content = (
    <Grid container spacing={1}>
      <Grid size={12}>{renderHeader('ORGANIZATIONL DETAILS')}</Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Organization name ar"
          value={Data.organization_name_ar}
          name="organization_name_ar"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Organization name en"
          value={Data.organization_name_en}
          name="organization_name_en"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Email"
          value={Data.email}
          name="email"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Mobile"
          value={Data.mobile}
          name="mobile"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Password"
          value={Data.password}
          name="password"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Industry"
          value={Data.industry_id}
          name="industry_id"
          itemlabel="name_en"
          itemValue="id"
          items={dataList?.industries}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <SelectFieldComp
          label="Organization Location"
          value={Data.country_id}
          name="country_id"
          itemlabel="name_en"
          itemValue="id"
          items={dataList?.countries}
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Organization State"
          value={Data.country_state_id}
          name="country_state_id"
          itemlabel="name_en"
          itemValue="id"
          items={dataList?.country_states[Data.country_id] || []}
          onChange={onChange}
          applyWhenChange={(e) => {
            const { name, value } = e.target;
            let findState = dataList?.country_states[Data.country_id]?.find(
              (ele) => ele.id === value
            );
            if (findState.id) {
              setData((prev) => ({
                ...prev,
                postal_code: findState.zip_code,
                time_zone_id: findState?.time_zone?.id,
              }));
              setIsTimeZoneUpdated(true);
              setTimeout(() => {
                setIsTimeZoneUpdated(false);
              }, 1000);
            }
          }}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="Postal Code"
          value={Data.postal_code}
          name="postal_code"
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Plan"
          value={Data.plan_id}
          name="plan_id"
          itemlabel="plan_name_en"
          itemValue="id"
          items={dataList?.plans}
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Plan Price Monthly"
          value={Data.plan_price_id}
          name="plan_price_id"
          itemlabel="monthly_price_en"
          itemValue="id"
          items={dataList?.plan_prices[Data.plan_id] || []}
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <TextFieldComp
          label="City"
          value={Data.city}
          name="city"
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <TextFieldComp
          label="Street1"
          value={Data.street1}
          name="street1"
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <TextFieldComp
          label="Street2"
          value={Data.street2}
          name="street2"
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>{renderHeader('REGIONAL SETTINGS')}</Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Currency"
          value={Data.currency_id}
          name="currency_id"
          itemlabel="currency_name"
          itemValue="id"
          loading={IsCurrencyUpdated}
          disabled={true}
          items={dataList?.currencies}
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Language"
          value={Data.language}
          name="language"
          itemlabel="name"
          itemValue="id"
          items={[
            { name: 'Arabic', id: 'ar' },
            { name: 'English', id: 'en' },
          ]}
          onChange={onChange}
        />
      </Grid>
      <Grid size={6}>
        <SelectFieldComp
          label="Time Zone"
          value={Data.time_zone_id}
          name="time_zone_id"
          itemlabel="name"
          itemValue="id"
          loading={IsTimeZoneUpdated}
          items={dataList?.timeZones}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12} mt={2} mb={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">
            Is this business registered for VAT?
          </Typography>
          <Switch
            checked={Data.registered_for_vat}
            onChange={(event) => {
              setData((prev) => ({
                ...prev,
                registered_for_vat: event.target.checked,
              }));
            }}
          />
        </Box>
      </Grid>
      {Data.registered_for_vat && (
        <Grid size={6}>
          <TextFieldComp
            label="Tax Registration Number Label"
            value={Data.tax_registration_number_label}
            name="tax_registration_number_label"
            onChange={onChange}
          />
        </Grid>
      )}
      {Data.registered_for_vat && (
        <Grid size={6}>
          <TextFieldComp
            label="Tax Registration Number (TRN)"
            value={Data.tax_registration_number}
            name="tax_registration_number"
            onChange={onChange}
          />
        </Grid>
      )}
      {Data.registered_for_vat && (
        <Grid size={12}>
          <TextFieldComp
            label="VAT Registered On"
            value={Data.vat_registered_on}
            name="vat_registered_on"
            type={'date'}
            onChange={onChange}
          />
        </Grid>
      )}
    </Grid>
  );
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
            Please check your email box to confirm email.
          </Typography>
        </Stack>
      ) : (
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
          <Typography
            sx={{
              fontWeight: '700',
              lineHeight: '31.69px',
              marginBottom: '0px',
              padding: '5px 0px',
              textAlign: 'center',
              width: '100%',
            }}
            variant="subtitle2"
          >
            Set up your organization profile
          </Typography>
          {Fields_Content}
          <Divider sx={{ width: '100%' }} />
          <Typography variant="subtitle2">Note:</Typography>
          <Typography variant="body2">
            1- You can update some of these preferences from Settings anytime.
          </Typography>
          <Divider sx={{ width: '100%' }} />
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
            Get Started
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
              Have an account ? login.
            </Typography>
          </Link>
        </Stack>
      )}
    </>
  );
}

export default Signup;
