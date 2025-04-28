export interface Theater {
  id: number;
  name: string;
  address: string;
  Screen: Screen[];
  imageUrl: string;
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
  rating: string;
};

export interface AuthenticationPost {
  username: string;
  password: string;
}

export interface AuthenticationFetch {
  token: string;
  user: {
    id: string;
    username: string;
    // Add other user fields if needed
  };
}

export interface MovieSchedule {
  id: number;
  movie: Movie;
  theater: Theater;
  showtime: number;
}


export interface Screen {
  screenId: number;
  theaterId: number;
  theaterName: string;
  location: string;
  seatCount: number;
  movieId: number;
  movieTitle: string;
  movieGenre: string;
  movieUrl: string;
};