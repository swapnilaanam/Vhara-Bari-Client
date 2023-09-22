import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleRentalHouse = () => {
    const [house, setHouse] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/houses/${id}`)
            .then(res => res.json())
            .then(data => setHouse(data))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div className="w-full h-screen bg-green-50 p-24">
            <div className="flex justify-between gap-20">
                <div className="w-1/2 bg-yellow-200 p-3 rounded-sm shadow-lg shadow-yellow-100">
                    <img src={house.houseImage} alt={house.houseName} className="w-full h-[375px] rounded object-cover" />
                </div>
                <div className="w-1/2 mt-7 space-y-5">
                    <h2 className="text-2xl font-semibold">{house.houseName}</h2>
                    <p className="text-lg font-medium">By {house.ownerName}</p>
                    <div className="flex">
                        <p className="text-lg font-medium me-3">Description: </p>
                        <div className="mt-1 flex flex-wrap justify-start items-center gap-2">
                            <div className="badge badge-neutral text-white">{house.bedroomNumber} Bedroom</div>
                            <div className="badge badge-neutral text-white">{house.dineNumber} Dine</div>
                            <div className="badge badge-neutral text-white">{house.kitchenNumber} kitchen</div>
                            <div className="badge badge-neutral text-white">{house.livingroomNumber} Living Room</div>
                            <div className="badge badge-neutral text-white">{house.bathroomNumber} Bathroom</div>
                        </div>
                    </div>
                    <p className="text-lg font-medium flex items-center">
                        <span className="me-3">Floor Number: </span>
                        <div className="badge badge-neutral text-white">{house.floorNumber}</div>
                    </p>
                    <p className="text-lg font-medium">Location: {house.streetAddress}, {house.city}</p>

                    <p className="text-lg font-medium">Rent Price: <strong>{house.rentPrice}</strong>/month</p>
                    <div className="pt-8">
                        <Link to={`/checkout/${house._id}`} className="btn btn-warning text-black px-8">Rent Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRentalHouse;