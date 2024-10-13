import { useNavigate } from "react-router-dom";
import paytm from "../assets/paytm.png"; 
import { useState } from "react"; 

export const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); 

    const toggleModal = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <>
           
            <div 
                className="relative h-screen bg-cover bg-center" 
                style={{ backgroundImage: `url(${paytm})` }} 
            >
                
                <nav className="absolute top-0 left-0 w-full bg-slate-900/90 text-white shadow-md z-10">
                    <div className="container flex flex-wrap items-center justify-between px-10 py-4 mx-auto text-gray-200">
                       
                        <a href="#" className="mr-4 block cursor-pointer py-1.5 text-gray-200 text-xl font-bold">
                           <b>PayTM</b>💓<i>UPI</i>
                        </a>

                       
                        <button 
                            onClick={toggleModal}
                            className="ml-auto block lg:hidden focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>

                       
                        <div className="hidden lg:block">
                            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                                <li className="flex items-center p-1 text-sm gap-x-2 text-gray-200">
                                    <a href="#" className="flex items-center text-lg">
                                        Company
                                    </a>
                                </li>
                                <li className="flex items-center p-1 text-sm gap-x-2 text-gray-200">
                                    <a onClick={() => navigate("/dashboard")} className="flex items-center cursor-pointer text-lg">
                                        Dashboard
                                    </a>
                                </li>
                                <li className="flex items-center p-1 text-sm gap-x-2 text-gray-200">
                                    <a onClick={() => navigate("/signin")} className="flex items-center cursor-pointer text-lg">
                                        Signin
                                    </a>
                                </li>
                                <li className="flex items-center p-1 text-sm gap-x-2 text-gray-200">
                                    <a onClick={() => navigate("/signup")} className="flex items-center cursor-pointer text-lg">
                                        Signup
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                
                {isOpen && (
                    <div className="fixed inset-0 z-20 bg-slate-900/80 flex items-center justify-center">
                        <div className="bg-white rounded-md p-4">
                            <ul className="flex flex-col items-center">
                                <li className="p-2 text-lg text-slate-900 cursor-pointer" onClick={() => { navigate("/dashboard"); toggleModal(); }}>
                                    Dashboard
                                </li>
                                <li className="p-2 text-lg text-slate-900 cursor-pointer" onClick={() => { navigate("/signin"); toggleModal(); }}>
                                    Signin
                                </li>
                                <li className="p-2 text-lg text-slate-900 cursor-pointer" onClick={() => { navigate("/signup"); toggleModal(); }}>
                                    Signup
                                </li>
                                <li className="p-2 text-lg text-slate-900 cursor-pointer" onClick={toggleModal}>
                                    Close
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
