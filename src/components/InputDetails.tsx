import { useContext, useState, type FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Context } from "../context";

export const InputDetails = () => {
  const { loandetails, setLoanDetails } = useContext(Context);

  const [values, setValues] = useState({
    principal: loandetails.principal,
    interest: loandetails.interest,
    year: loandetails.year,
  });

  const [errors, setErrors] = useState({
    principal: false,
    interest: false,
    year: false,
  });

  const handleChange =
    (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: Number(e.target.value) });
      setErrors({ ...errors, [key]: false }); // Clear error on change
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      principal: values.principal <= 0,
      interest: values.interest <= 0,
      year: values.year <= 0,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoanDetails(values);
  };

  const fields = [
    {
      label: "Principal",
      key: "principal",
    },
    {
      label: "Interest Rate",
      key: "interest",
    },
    {
      label: "Loan Duration (Years)",
      key: "year",
    },
  ] as const;

  return (
    <>
      <h1 className="text-4xl my-5">Loan Calculator Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <Box display="flex" columnGap={2} rowGap={3} flexWrap="wrap">
          {fields.map(({ label, key }) => (
            <TextField
              key={key}
              label={label}
              value={values[key]}
              onChange={handleChange(key)}
              variant="outlined"
              sx={{
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "48%", // Half on small screens
                  md: "32%", // Roughly 1/3 on medium+
                },
                minWidth: "200px",
              }}
              required
              type="number"
              error={errors[key]}
              helperText={errors[key] && `${label} is required`}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Calculate
        </Button>
      </form>
    </>
  );
};
