import { useContext } from "react";
import { InputDetails } from "../components/InputDetails";
import { Context } from "../context";
import { ShowEmiData } from "../components/ShowEmidata";


export const Home = () => {
  const { loandetails } = useContext(Context);
  const { principal, interest, year } = loandetails;
  const isValid = principal > 0 && interest > 0 && year > 0;
  
  return (
    <div className="mx-auto container py-5 px-5">
      <InputDetails/>
      {isValid ? <ShowEmiData/> : null }
    </div>
  );
};
