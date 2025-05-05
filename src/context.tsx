import React, { createContext, useState, type ReactNode } from "react";

// Define the type for the loan details object
interface LoanDetails {
  principal: number;
  interest: number;
  year: number;
}

// Initial loan details
const initialState: LoanDetails = {
  principal: 0,
  interest: 0,
  year: 0,
};

// Define the context value type
interface ContextType {
  loandetails: LoanDetails;
  setLoanDetails: React.Dispatch<React.SetStateAction<LoanDetails>>;
}

// ✅ Now this works because `initialState` is declared above
export const Context = createContext<ContextType>({
  loandetails: initialState,
  setLoanDetails: () => {}, // Temporary default function (will be overridden in provider)
});

interface ContextProviderProps {
  children: ReactNode;
}

// Provider component
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [loandetails, setLoanDetails] = useState<LoanDetails>(initialState);



  return (
    <Context.Provider value={{ loandetails, setLoanDetails }}>
      {children}
    </Context.Provider>
  );
};
