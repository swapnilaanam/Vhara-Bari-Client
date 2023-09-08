import EditHouse from "./EditHouse";

const SingleHouse = ({ index, house, handleDelete, refetch }) => {
    const { _id, houseName, ownerName, houseImage, streetAddress, city, bedroomNumber, livingroomNumber, dineNumber, kitchenNumber, bathroomNumber, floorNumber, rentPrice, status } = house;

    return (
        <div className="card card-compact w-72 lg:w-96 bg-base-100 border-2 shadow-xl rounded-lg">
            <img src={houseImage} alt={houseName} className="h-[250px] rounded-t-lg" />
            <div className="w-full card-body">
                <div className="flex justify-between">
                    <h2 className="card-title text-xl">{houseName}</h2>
                    <div className="badge badge-neutral text-white text-sm mt-0.5 px-4 py-3">{status}</div>
                </div>
                <p className="text-base">Rented By <strong>{ownerName}</strong></p>
                <div className="mt-1 flex flex-wrap justify-start items-center gap-2">
                    <div className="badge badge-neutral text-white">{bedroomNumber} Bedroom</div>
                    <div className="badge badge-neutral text-white">{dineNumber} Dine</div>
                    <div className="badge badge-neutral text-white">{kitchenNumber} kitchen</div>
                    <div className="badge badge-neutral text-white">{livingroomNumber} Living Room</div>
                    <div className="badge badge-neutral text-white">{bathroomNumber} Bathroom</div>
                </div>
                <p className="text-base mt-2">Location: <strong className="ms-2">{streetAddress}, {city}</strong></p>
                <p className="text-base">Floor Number: <strong className="ms-2">{floorNumber}</strong></p>
                <p className="text-base">Rent: <strong className="ms-2">{rentPrice}</strong>/month</p>
                <div className="flex justify-end gap-2 my-2">
                    <label htmlFor={`edit_house_${index}`} className="btn btn-sm btn-warning">Edit</label>
                    <EditHouse index={index} house={house} refetch={refetch}></EditHouse>
                    <button onClick={() => handleDelete(_id)} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default SingleHouse;