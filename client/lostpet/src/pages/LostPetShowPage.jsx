import { json } from "react-router-dom";
import { lostPetInstance } from "../util/BaseAxiosInstance";

const ShowPage = () => {
    return (
        <>
            <h1>ShowPage</h1>
            <p>test</p>
        </>
    )
};

export default ShowPage;

export const loader = async ({request, params}) => {
    const lostPetId = params.lostPetId;

    try {
        const response = await lostPetInstance.get(`/lostpets/${lostPetId}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response)
        throw json({message: error.response.data.error.message}, {status: error.response.status});
    }

    return null;
};