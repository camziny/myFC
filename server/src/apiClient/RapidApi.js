import got from "got";
import dotenv from "dotenv";
dotenv.config();

const rapidApiKey = process.env.X_RapidAPI_Key;

class RapidApi {
  static async getTeams() {
    try {
      const apiResponse = await got(
        "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2022",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPlayers({ teamId, pageNumber = 1 }) {
    try {
      const apiResponse = await got(
        `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&league=39&season=2022&page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAssignments({ assignmentId }) {
    try {
      const apiResponse = await got(
        `https://api-football-v1.p.rapidapi.com/v3/players?id=${assignmentId}&league=39&season=2022`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getWorldCupTeams() {
    try {
      const apiResponse = await got(
        "https://api-football-v1.p.rapidapi.com/v3/teams?league=1&season=2022",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getWorldCupPlayers({ teamId, pageNumber = 1 }) {
    try {
      const apiResponse = await got(
        `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&league=1&season=2022&page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getWorldCupStandings() {
    try {
      const apiResponse = await got(
        "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=1",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${rapidApiKey}`,
          },
        }
      );
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default RapidApi;
