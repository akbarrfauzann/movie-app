import config from "./config";

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "APIError";
  }
}

export const movieService = {
  headers: {
    Authorization: `Bearer ${config.API_TOKEN}`,
    "Content-Type": "application/json",
  },

  async fetchWithErrorHandling(endpoint) {
    try {
      const response = await fetch(`${config.BASE_URL}${endpoint}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new APIError(`Error API: ${response.statusText}`, response.status);
      }

      const data = await response.json();

      if (data.success === false) {
        throw new APIError(data.status_message, data.status_code);
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Error connecting to API: ${error.message}`, 500);
    }
  },

  // Upcoming Movies
  async getUpcomingMovies(page = 1) {
    return this.fetchWithErrorHandling(`/movie/upcoming?language=en-US&page=${page}`);
  },

  // Discover Movies
  async getDiscoverMovies({ page = 1, sortBy = "popularity.desc", withGenres = "", year = "" } = {}) {
    const params = new URLSearchParams({
      language: "en-US",
      page: page.toString(),
      sort_by: sortBy,
      ...(withGenres && { with_genres: withGenres }),
      ...(year && { year: year.toString() }),
    });

    return this.fetchWithErrorHandling(`/discover/movie?${params.toString()}`);
  },

  // Detail Movies
  async getMovieDetails(id) {
    if (!id) throw new Error("Need movie id");
    return this.fetchWithErrorHandling(`/movie/${id}?language=en-US&append_to_response=credits,similar`);
  },

  async getDiscoverTvShows(page = 1) {
    return this.fetchWithErrorHandling(`/tv/on_the_air?language=en-US&page=${page}`);
  },

  // Trailer Movies
  async getMovieTrailer(id) {
    if (!id) throw new Error("ID film diperlukan");
    return this.fetchWithErrorHandling(`/movie/${id}/videos?language=en-US`);
  },

  // Genre Movies
  async getGenres() {
    return this.fetchWithErrorHandling("/genre/movie/list?language=en-US");
  },

  // Search Movies
  async searchMovies(query, page = 1) {
    if (!query) throw new Error("Need movie query");
    const params = new URLSearchParams({
      query: query.trim(),
      language: "en-US",
      page: page.toString(),
    });

    return this.fetchWithErrorHandling(`/search/movie?${params.toString()}`);
  },
};
