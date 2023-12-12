import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const NewAppointments = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const serviceAccountJson = {
          type: "service_account",
          project_id: "myhpi-405813",
          private_key_id: "44dde750c2a3ae3974d12702e008ae789cb24af2",
          private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCo1ykkgwPqzSqK\n8Hr4hb1Rb3NmTlyyGzHyGBXMqYszyHVAid6ajZvdrzSE3P1ovl6TSm1zRAJUcyK0\n/emNC/KM9kQLjj4wQ21suYMdU0SW+soKM6bz5oQoVUSw5W+1Rv4+urQxIxOrh7/p\nm+ZWVH5O1E1PeVOoALDqnqrB55zOTIqCYYa6gQTWMxqxdRGhhnzUWSqoFZc8el4M\nqGtNQ5zfLgGpouOorJnhaoII9tyfoodfziD4V6k+Vgn8FfL1hUmeFWWOMSw3BDm4\n+ytJCT9oM2aHFHURgB/dSU0Q8ESa5wTCOkeZnH63UZ0QZhxzM3Lem+PN/ZU5QaQd\nz+ji35FXAgMBAAECggEAUgx9SekBNlGNowdKOwuC/NgUVFswYL0mgGeD8HlT1E5N\n7JcTPjgizpAeDZL28rfQbfN1TNZ362IoM5xQquJrdGUYnCT7w6iAvJ1KQi383wHw\nvRRsxYn4H0GQqAZXSti9JO7GMjrBjFHjyTqhrMJSvywchcqIBNSRJPMGOES9xuJQ\nxPBxIHS8K/sftXqEpqxj56dUBTuun8s/NaZ1th6Yl+BX8q15a8OjjZm5/W/NWtPe\n2gSgn12imbopC6G8j3Aq+NX9c9+Ho7iwOx7RFQm619JoQn7MYw98tglIK7ptWk0B\nSczMyAfsYVYIgX6UyAjmsQeCfxb3GoMwqVjpJlXWAQKBgQDehzdsThMD7vS3jMn6\nTAtxZgFppdibIdppjB7Z+GNwjEWOxqWTLtgi4TjnsdWqM+PVJsLaNJQOZq01IBs0\n49310oyHR6wKx1PnR8lk0baTIfLIv5Cg1N6pyq0FtsehYTjSydC+sksajAxK3Bsd\nufI/iiopEQuq9a+nrAeKhSqKoQKBgQDCPJ4gNC37fvIn2UjQt4m/9928qeKKUdkh\nccQPAwtlkWfGZSoaMTA79VkW+JYU8qXcXCB52v4K7pQJ3V8vn3kzcPweDS8PyltX\nv7gTWC0vDyosTh0kaSnKZaUaXMY914gIgMFSuDViCW09b/nKhMzRYIxS1OtOYCrx\ned9esZHQ9wKBgHlWM4NLwxSW/DsFerCPPIIVw9luhAB64hRBQiVKSjZ5Vgg3CtuJ\nZHMIabX0gvPunWGBZCgFGWIM3I8mNY+OXF4I83VkQEwUSgzHWOova6UokrChu+Pm\njo74o4WFF69ISuqs/rSslUUhbiZ3hBWeaZf552lDESCkHKaJqAcA+6RhAoGADqrv\nMfVex5AljzbMVd6WS2XXW8jkb5eQswLZUFzlfm0FjijTjhjK0KxNZvussbZFKifW\n1/zelErB6SDLcFg1mdndYBOUyzd3wF+c8fEFsHkPsTrQ3pAGdN9KIXyCB+d/wUyf\nzLRWa6nUkwAit9Vhdio5ToP/pPKEK6oNYSQ9o68CgYBs9MaZpgpcsW3hk5dzP55C\nNsNxbxRFEVDxeXThVVedREKPvnz6cU8auwD0duytEoYKH/e7qjCWo231QVp53mFR\nfe+YOmrH6cQ4zpLpGOIyv0xzpNZ8KhLoK12mxGZCLZdiucW15yJbShop97WanYZU\n1983q5gdy3raZ2pe2fMEFQ==\n-----END PRIVATE KEY-----\n",
          client_email: "myhpicalender@myhpi-405813.iam.gserviceaccount.com",
          client_id: "107183061910930695840",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/myhpicalender%40myhpi-405813.iam.gserviceaccount.com",
          universe_domain: "googleapis.com",
        };

        // Fetch access token using service account credentials
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: serviceAccountJson,
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
          console.log("Access Token:", accessToken);

          // Fetch calendar events using the obtained access token
          // Adjust the code accordingly based on your authentication flow
          // ...
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
