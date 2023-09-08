import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/payments/${user?.email}`);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="w-full min-h-screen px-4 lg:px-0">
            <div className="max-w-5xl mx-auto my-10">
                <div className="w-[278px] lg:w-full overflow-x-auto">
                    <table className="table text-center">
                        <thead className="text-black border-2 border-gray-400 bg-gray-300">
                            <tr>
                                <th></th>
                                <th>House Name</th>
                                <th>Transaction Id</th>
                                <th>Transaction Amount</th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-gray-400 bg-gray-50">
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <tr key={payment?._id}>
                                        <th>
                                            <label>{index + 1}.</label>
                                        </th>
                                        <td>
                                            <div className="font-bold">{payment?.houseName}</div>
                                        </td>
                                        <td>{payment.transactionId}</td>
                                        <td className="font-bold">BDT. {payment?.price}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No payment history available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default PaymentHistory;