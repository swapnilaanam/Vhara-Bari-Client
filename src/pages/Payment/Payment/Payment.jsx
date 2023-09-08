import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
    const [rentedHouseInfo, setRentedHouseInfo] = useState({});

    const { id } = useParams();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: house = {} } = useQuery({
        queryKey: ['house', id],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`http://localhost:5000/houses/${id}`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        if (user) {
            const rentedHouse = {
                houseId: house._id,
                houseName: house.houseName,
                location: `${house.streetAddress}, ${house.city}`,
                ownerName: house.ownerName,
                ownerEmail: house.ownerEmail,
                renterName: user.displayName,
                renterEmail: user.email,
                total: +house.rentPrice + (+(house.rentPrice * 2.5) / 100) + (+(house.rentPrice * 0.5) / 100)
            }

            setRentedHouseInfo(rentedHouse);
        }
    }, [house, user]);

 
    return (
        <div className="py-24 w-full h-[620px] bg-green-50">
            <h4 className="text-2xl font-semibold text-center mt-16 mb-10">Make Your Payment</h4>
            <div className="flex justify-center">
                {
                        <Elements stripe={stripePromise}>
                            <CheckOutForm rentedHouseInfo={rentedHouseInfo} price={rentedHouseInfo.total} selectedHouseId={id}/>
                        </Elements>
                }
            </div>
        </div >
    );
};

export default Payment;