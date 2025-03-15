const API_URL = "http://localhost:5000/api";

export const saveVenue = async (venueData) => {
  try {
    const response = await fetch(`${API_URL}/venues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venueData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving venue:", error);
    throw error;
  }
};

export const fetchVenues = async () => {
  try {
    const response = await fetch(`${API_URL}/venues`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
