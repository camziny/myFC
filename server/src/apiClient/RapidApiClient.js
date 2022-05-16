import got from "got";
import "server/.env"

const rapidApiKey = process.env.REACT_RAPID_API_KEY

class RapidApiClient {   
  static async getTeam(teamName) {
    try {
      const url = 'https://api-football-v1.p.rapidapi.com/v3/teams';
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default RapidApiClient;