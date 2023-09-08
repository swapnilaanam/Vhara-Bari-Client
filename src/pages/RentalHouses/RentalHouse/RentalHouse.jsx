import { Link } from "react-router-dom";

const RentalHouse = ({ rentalHouse }) => {

    const { _id, houseName, ownerName, houseImage, streetAddress, city, rentPrice } = rentalHouse;

    return (
        <div className="card card-compact w-80 lg:w-96 bg-base-100 rounded-md shadow-xl">
            <figure><img src={houseImage} className="w-full h-[245px] object-cover" alt={houseName} /></figure>
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-xl">{houseName}</h2>
                    <h4 className="text-base">
                        <strong>Rent:</strong> <div className="badge badge-neutral text-white text-base">{rentPrice}</div>
                        <div className="text-xs text-right">* per month</div>
                    </h4>
                </div>
                <div className="space-y-3 text-base">
                    <p>By <strong>{ownerName}</strong></p>
                    <p><strong>Location:</strong> {streetAddress}, {city}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/rentalhouses/${_id}`}>
                        <button className="btn btn-warning text-black btn-sm">Details</button>
                    </Link>
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-success text-black btn-sm">Rent Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RentalHouse;