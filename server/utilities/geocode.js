const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const geocode = async (urlEncodedAddress) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${urlEncodedAddress}.json?access_token=${MAPBOX_TOKEN}`);
    const feature = response.data.features[0];
    return {
        type: 'Point',
        coordinates: feature.geometry.coordinates
    };
}

module.exports = geocode;