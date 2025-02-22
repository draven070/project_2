import { cosineSimilarity } from './vectorUtils.js'; // Import cosine similarity function

// Function to preprocess hotel data into vectors
function preprocessHotelData(hotels) {
    const uniqueLocations = [...new Set(hotels.map(hotel => hotel.location))]; // Extract unique locations
    const uniqueHotelNames = [...new Set(hotels.map(hotel => hotel.hotel_name))]; // Extract unique hotel names

    return hotels.map(hotel => {
        const locationVector = locationToVector(hotel.location, uniqueLocations);
        const nameVector = nameToVector(hotel.hotel_name, uniqueHotelNames);
        const priceVector = priceToVector(hotel.price_range);
        const ratingVector = [parseFloat(hotel.rating) / 5]; // Normalize rating between 0 and 1

        return {
            ...hotel,
            vector: [...locationVector, ...nameVector, ...priceVector, ...ratingVector]
        };
    });
}

// Convert location into a one-hot encoded vector dynamically
function locationToVector(location, uniqueLocations) {
    return uniqueLocations.map(loc => (loc === location ? 1 : 0));
}

// Convert hotel name into a one-hot encoded vector dynamically
function nameToVector(hotelName, uniqueHotelNames) {
    return uniqueHotelNames.map(name => (name === hotelName ? 1 : 0));
}

// Convert price range to a normalized scale
function priceToVector(priceRange) {
    const match = priceRange.match(/\$([\d]+)\s*-\s*\$([\d]+)/);
    if (match) {
        const minPrice = parseInt(match[1]);
        const maxPrice = parseInt(match[2]);
        return [(minPrice + maxPrice) / 2 / 500]; // Normalize by dividing by 500
    }
    return [0]; // Default value if price is not available
}

// Find hotels similar to the given location
export function cosSim(userLocation, hotels) {
    const hotelData = preprocessHotelData(hotels);
    const uniqueLocations = [...new Set(hotels.map(hotel => hotel.location))];

    // Convert user input location into a vector
    const userLocationVector = locationToVector(userLocation, uniqueLocations);

    const similarities = hotelData
        .map(hotel => ({
            ...hotel,
            similarity: cosineSimilarity([...userLocationVector, ...hotel.vector.slice(-3)], hotel.vector)
        }))
        .sort((a, b) => {
            // Sort by similarity first
            if (b.similarity !== a.similarity) {
                return b.similarity - a.similarity;
            }
            // If similarity is the same, sort by highest rating first
            if (parseFloat(b.rating) !== parseFloat(a.rating)) {
                return parseFloat(b.rating) - parseFloat(a.rating);
            }
            // If rating is the same, sort by lowest price range first
            const aPrice = priceToVector(a.price_range)[0];
            const bPrice = priceToVector(b.price_range)[0];
            return aPrice - bPrice;
        });

    return similarities;
}
