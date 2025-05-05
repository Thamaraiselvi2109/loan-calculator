import { useContext, useMemo, useState, useEffect } from "react";
import { Context } from "../context";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Button, MenuItem, Select,
  InputLabel, FormControl, useMediaQuery, useTheme
} from "@mui/material";

type AmortizationRow = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
};

const generateAmortizationSchedule = (
  loanAmount: number,
  annualRate: number,
  years: number
): { schedule: AmortizationRow[]; monthlyEMI: number } => {
  const monthlyRate = annualRate / 12 / 100;
  const payments = years * 12;
  const emi = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= payments; month++) {
    const interest = balance * monthlyRate;
    const principal = emi - interest;
    balance -= principal;
    schedule.push({
      month,
      principal: +principal.toFixed(2),
      interest: +interest.toFixed(2),
      balance: +Math.max(balance, 0).toFixed(2),
    });
  }

  return { schedule, monthlyEMI: +emi.toFixed(2) };
};

const currencySymbols: Record<string, string> = {
  USD: "$", INR: "₹", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$"
};

export const ShowEmiData = () => {
  const { loandetails, setLoanDetails } = useContext(Context);
  const { principal, interest, year } = loandetails;
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1); // default 1 for USD
  const { schedule, monthlyEMI } = useMemo(
    () => generateAmortizationSchedule(principal, interest, year),
    [principal, interest, year]
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const symbol = currencySymbols[currency] || currency;

  // 👇 Fetch exchange rate whenever currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === "USD") {
        setConversionRate(1);
        return;
      }

      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/916937662ca1904b5d5fde3e/latest/USD`);
        const data = await res.json();
        setConversionRate(data.conversion_rates[currency] || 1);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setConversionRate(1); // fallback
      }
    };

    fetchExchangeRate();
  }, [currency]);

  const handleReset = () => {
    setLoanDetails({ principal: 0, interest: 0, year: 0 });
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Amortization Schedule ({currency})
      </Typography>

      <Typography variant="h6" mb={2} textAlign="center">
        Monthly EMI: {symbol}{(monthlyEMI * conversionRate).toFixed(2)}
      </Typography>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="center" alignItems="center" gap={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Currency</InputLabel>
          <Select value={currency} label="Currency" onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(currencySymbols).map((cur) => (
              <MenuItem key={cur} value={cur}>{cur}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleReset} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
          RESET TABLE
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, maxHeight: "70vh", overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>Month</b></TableCell>
              <TableCell><b>Principal</b></TableCell>
              <TableCell><b>Interest</b></TableCell>
              <TableCell><b>Remaining Balance</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map(({ month, principal, interest, balance }) => (
              <TableRow key={month} hover>
                <TableCell>{month}</TableCell>
                <TableCell>{symbol}{(principal * conversionRate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{symbol}{(interest * conversionRate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{symbol}{(balance * conversionRate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
