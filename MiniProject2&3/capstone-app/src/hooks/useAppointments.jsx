import { useState, useEffect } from 'react';

const useAppointments = (userId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      console.log("Fetching appointments...");
    const fetchAppointments = async () => {
      // If no userId is passed, we set an error
      if (!userId) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

        const token = localStorage.getItem('token'); // Get the token from localStorage
        console.log("Token:", token);
      if (!token) {
        setError('Token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token with the request
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments.');
        }

        const data = await response.json();
        setAppointments(data); // Set the appointments data
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchAppointments();
  }, [userId]); // Re-run this effect if the userId changes

  return { appointments, loading, error };
};

export default useAppointments;