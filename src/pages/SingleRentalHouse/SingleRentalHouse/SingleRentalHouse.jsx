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
                <div className="w-1/2">
                    <img src={house.houseImage} alt={house.houseName} className="w-full h-[375px] rounded" />
                </div>
                <div className="w-1/2 mt-7 space-y-4">
                    <h2 className="text-3xl font-semibold">{house.houseName}</h2>
                    <p className="text-xl font-medium">By {house.ownerName}</p>
                    <div className="flex">
                        <p className="text-xl font-medium me-3">Description: </p>
                        <div className="mt-1 flex flex-wrap justify-start items-center gap-2">
                            <div className="badge badge-neutral text-white">{house.bedroomNumber} Bedroom</div>
                            <div className="badge badge-neutral text-white">{house.dineNumber} Dine</div>
                            <div className="badge badge-neutral text-white">{house.kitchenNumber} kitchen</div>
                            <div className="badge badge-neutral text-white">{house.livingroomNumber} Living Room</div>
                            <div className="badge badge-neutral text-white">{house.bathroomNumber} Bathroom</div>
                        </div>
                    </div>
                    <p className="text-xl font-medium flex items-center">
                        <span className="me-3">Floor Number: </span>
                        <div className="badge badge-neutral text-white">{house.floorNumber}</div>
                    </p>
                    <p className="text-xl font-medium">Location: {house.streetAddress}, {house.city}</p>

                    <p className="text-xl font-medium">Rent Price: <strong>{house.rentPrice}</strong>/month</p>
                    <div className="mt-5">
                        <Link to={`/checkout/${house._id}`} className="btn btn-warning text-black">Rent Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRentalHouse;