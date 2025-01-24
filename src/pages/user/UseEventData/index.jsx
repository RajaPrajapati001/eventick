import { useState, useEffect } from 'react';
import { useGetUserHistoryMutation } from '../../../services/services'; 
import {jwtDecode} from 'jwt-decode';

export const useEventData = () => {
  const [email, setEmail] = useState('');
  const [eventData, setEventData] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [historyEvents, setHistoryEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchUserHistoryData] = useGetUserHistoryMutation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;
        setEmail(userEmail);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.warn('Token not found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (email) {
      const getData = async () => {
        setIsLoading(true);
        try {
          const res = await fetchUserHistoryData({ email }).unwrap();
          setEventData(res.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [email, fetchUserHistoryData]);

  useEffect(() => {
    const today = new Date();
    setUpcomingEvents(
      eventData.filter((event) => {
        const eventDateTime = new Date(`${event.startDate}T${event.eventStartTime}:00`);
        return eventDateTime > today; 
      })
    );
    setHistoryEvents(
      eventData.filter((event) => {
        const eventDateTime = new Date(`${event.startDate}T${event.eventStartTime}:00`);
        return eventDateTime <= today; 
      })
    );
  }, [eventData]);

  return { upcomingEvents, historyEvents, isLoading };
};

export default useEventData;