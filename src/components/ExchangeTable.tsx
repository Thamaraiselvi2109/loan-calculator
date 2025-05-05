import { useEffect, useState } from "react"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Alert} from "@mui/material"
import { Navbar } from "./Navbar"

export const ExchangeTable = () => {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({})
  const [baseCurrency] = useState("USD")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/8313c97a4377a09ba6a498f9/latest/${baseCurrency}`)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const json = await response.json()

        if (json.result !== "success") {
          throw new Error(json["error-type"] || "Unexpected API response")
        }

        setExchangeRates(json.conversion_rates)
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to fetch exchange rates")
      }
    }

    fetchRates()
  }, [baseCurrency])

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {error}
        </Alert>
      </div>
    )
  }

  return (
    <>
    <Navbar/>
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Exchange Rates (Base: {baseCurrency})
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Currency</strong></TableCell>
              <TableCell><strong>Rate</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <TableRow key={currency}>
                <TableCell>{currency}</TableCell>
                <TableCell>{rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  )
}
