const API_BASE_URL = "http://localhost:5000/api";

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json();
};
