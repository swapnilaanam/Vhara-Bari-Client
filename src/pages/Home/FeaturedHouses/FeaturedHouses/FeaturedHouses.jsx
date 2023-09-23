import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedHouse from "../FeaturedHouse/FeaturedHouse";
import { Link } from "react-router-dom";

const FeaturedHouses = () => {
    const [featuredHouses, setFeaturedHouse] = useState([]);

    useEffect(() => {
        axios.get('https://vhara-bari-server.vercel.app/houses')
            .then(response => {
                const houses = response.data.filter(house => house.status === 'Approved').slice(0, 3);
                setFeaturedHouse(houses);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className="py-28 bg-gray-50 px-4 lg:px-0">
            <h2 className="text-3xl font-medium text-center uppercase tracking-wider">Featured Houses</h2>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-20 pt-24">
                {
                    featuredHouses.map(featuredHouse => <FeaturedHouse
                        key={featuredHouse._id}
                        featuredHouse={featuredHouse}
                    >
                    </FeaturedHouse>)
                }
            </div>
            <div className="text-center mt-20">
                <Link to="/rentalhouses">
                    <button className="px-20 py-3 text-lg font-medium bg-emerald-600 text-white rounded">See All Houses</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedHouses;