export interface Theater {
  id: number;
  name: string;
  address: string;
  seatCount: number; 
}

export interface Showtime {
  showtime: string;
};

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  runtimeMinutes: number;
  showtimes: Showtime[];
  imageUrl: string;
};