import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    
    const fetchMoney = async () => {
      const token = localStorage.getItem("Token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBalance(Math.round(response.data.balance));  // Assuming balance is in response.data.account.balance
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchMoney();
  }, []); // Empty array ensures the effect runs only once when the component mounts

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} /> 
        <Users />
      </div>
    </div>
  );
};
