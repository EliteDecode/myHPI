import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const NewAppointments = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const serviceAccountJson = {
          // Your service account credentials here...
        };

        // Fetch access token using service account credentials
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteWhwaWNhbGVuZGVyQG15aHBpLTQwNTgxMy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInNjb3BlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9jYWxlbmRhci5ldmVudHMiLCJhdWQiOiJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsImV4cCI6MTcwMjA1MDEzNywiaWF0IjoxNzAyMDQ2NTM3fQ==.kwrrlAI5hujOMYJt4w5c5kqe/yb8xGSpz/s0bb3hTXm+C267/cvewutW47e9x1H3HzSR0xlxGbfXbhTqAmad72mgn5/qBlhAbU9H+LatwijKk9XlkBeNgk6ZjQQP64uPmTjpVlvdNQBVgh4nYIFh6wW0Hx8x+JjbTciZQQHaZS1paVOfTqhNj8zXRQGfbqo7hPcuStrKkswW3m8OfnJaU7a/MNGO1OIgdDKoRpwIoWn1FwjIUqAnmOoYAIZRf6mHbo1Uf7QRj+Swekpcz4SZN2FFf+mUiRC2DbYiLqV78tr+qMoyFZGPiOhDyMlTkRgJnCW+uC6jALLu50BydQbWLw==",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const responseBody = response.data;
        if (responseBody.access_token) {
          // Use the access token to make authenticated requests to the Google Calendar API
          const accessToken = responseBody.access_token;
          // Fetch calendar events using the obtained access token
          const calendarEventsResponse = await axios.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(calendarEventsResponse.data);
          setEvents(calendarEventsResponse.data.items);
        }
      } catch (error) {
        console.error("Error fetching calendar events:", error.message);
      }
    };

    fetchCalendarEvents();
  }, []); // Run only once when the component mounts

  return (
    <View>
      <Text>Calendar Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.summary}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default NewAppointments;
