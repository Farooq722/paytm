import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const Appbar = () => {

    const [user, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUser = async () => {

            //taking logged in or signed up user's token 
            const token = localStorage.getItem("Token");
            // console.log(token);

            //if not token found then user not logged in or signed up
            if (!token){
                console.log("No Token found please login");
                return;
            }
            
            //decoding user using token to get userId of user 
            const tokenDecode = jwtDecode(token);
            const userId = tokenDecode.userId;

            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=");

            // console.log(userId);
            let userExits = response.data.user.find(user => user._id == userId);
            // console.log(userExits.firstName);

            // console.log(response.data.user);
            setUsers(userExits.firstName);
        }
        fetchUser();
    },[]);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {user}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user[0]}
                </div>
            </div>
        </div>
    </div>
}