import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const CheckOut = () => {
    const { id } = useParams();

    const { user } = useAuth();

    const { data: house = {} } = useQuery({
        queryKey: ['house', id],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://vhara-bari-server.vercel.app/houses/${id}`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="py-24 bg-green-100 px-4 lg:px-0">
            <div className="max-w-2xl mx-auto ">
                <div className="flex flex-col bg-white border-2 shadow-xl rounded-md px-5 py-12 text-sm gap-5">
                    <div className="flex justify-between gap-2">
                        <div>House Name:</div>
                        <div><strong>{house.houseName}</strong></div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div>Location:</div>
                        <div><strong>{house.streetAddress}</strong></div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div>Owner Name:</div>
                        <div><strong>{house.ownerName}</strong></div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div>Owner Email:</div>
                        <div><strong>{house.ownerEmail}</strong></div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div>Renter Name:</div>
                        <div><strong>{user?.displayName}</strong></div>
                    </div>

                    <div className="flex justify-between gap-2">
                        <div>Renter Email:</div>
                        <div><strong>{user?.email}</strong></div>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto bg-white mt-8 px-7 py-12 border-2 shadow-xl rounded-md">
                <div className="flex justify-between">
                    <div className="text-lg font-semibold space-y-4">
                        <div>Rent(1st Month):</div>
                        <div>Tax(2.5%):</div>
                        <div>Service Charge(0.5%):</div>
                    </div>
                    <div className="text-base font-medium space-y-5 text-right">
                        <div>{house.rentPrice}</div>
                        <div>{`${(house.rentPrice * 2.5) / 100}`}</div>
                        <div>{`${(house.rentPrice * 0.5) / 100}`}</div>
                    </div>
                </div>
                <div className="divider before:bg-gray-400 after:bg-gray-400"></div>
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">SubTotal:</div>
                    <div className="text-lg font-medium text-right">
                        {`${+house.rentPrice + (+(house.rentPrice * 2.5) / 100) + (+(house.rentPrice * 0.5) / 100)}`}
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="text-right mt-12 me-5">
                    <Link to={`/payment/${house._id}`}>
                        <button className="btn btn-warning px-10">CheckOut</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;