export interface User {
  name: string;
  gender: string;
  email: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  picture: string;
  weather?: {
    temperature: number;
    min: number;
    max: number;
  };
}
