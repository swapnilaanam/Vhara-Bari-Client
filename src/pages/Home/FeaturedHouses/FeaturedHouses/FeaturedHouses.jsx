import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedHouse from "../FeaturedHouse/FeaturedHouse";
import { Link } from "react-router-dom";

const FeaturedHouses = () => {
    const [featuredHouses, setFeaturedHouse] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/houses')
            .then(response => {
                const houses = response.data.filter(house => house.status === 'Approved').slice(0, 3);
                setFeaturedHouse(houses);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className="py-28 bg-gray-100 px-4 lg:px-0">
            <h2 className="text-4xl font-medium text-center">Featured Houses</h2>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-20 pt-24">
                {
                    featuredHouses.map(featuredHouse => <FeaturedHouse
                        key={featuredHouse._id}
                        featuredHouse={featuredHouse}
                    >
                    </FeaturedHouse>)
                }
            </div>
            <Link to="/rentalhouses">
                <div className="text-center">
                    <button className="mt-16 px-10 text-lg btn btn-md btn-warning">See All Houses</button>
                </div>
            </Link>
        </div>
    );
};

export default FeaturedHouses;