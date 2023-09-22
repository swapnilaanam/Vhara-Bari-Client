import { Link } from "react-router-dom";

const FeaturedHouse = ({ featuredHouse }) => {
    const { _id, houseName, ownerName, houseImage, streetAddress, city, rentPrice } = featuredHouse;

    return (
        <div className="relative card card-compact w-80 bg-white rounded-sm shadow-xl shadow-green-300 z-0" data-aos="zoom-out-right" data-aos-duration="2000">
            <div className="absolute bg-green-400 w-full h-full -z-10 ms-3.5 mt-3.5"></div>
            <figure><img src={houseImage} className="w-full h-[200px] object-cover rounded-sm" alt={houseName} /></figure>
            <div className="card-body bg-white rounded-b-sm">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg">{houseName}</h2>
                    <h4 className="text-base">
                        <strong>Rent:</strong> <div className="badge badge-md badge-neutral text-white text-base">{rentPrice}</div>
                        <div className="text-xs text-right">* per month</div>
                    </h4>
                </div>
                <div className="space-y-3 text-md text-gray-700">
                    <p>By <strong>{ownerName}</strong></p>
                    <p><strong>Location:</strong> {streetAddress}, {city}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/rentalhouses/${_id}`}>
                        <button className="btn btn-warning text-black btn-sm capitalize">Details</button>
                    </Link>
                    <Link to={`/checkout/${_id}`} className="btn bg-emerald-600 text-white btn-sm hover:bg-emerald-700 capitalize">Rent Now</Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedHouse;