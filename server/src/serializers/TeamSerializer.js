import PlayerSerializer from "./PlayerSerializer";

class TeamSerializer {
  static async getSummary(team) {
    const allowedAttributes = ["id", "name", "city"];
    let serializedTeam = {};
    for (const attribute of allowedAttributes) {
      serializedTeam[attribute] = team[attribute];
    }
    return serializedTeam;
  }
  static async getDetails(team) {
    const allowedAttributes = ["name", "city", "players"];
    let serializedTeam = {};
    for (const attribute of allowedAttributes) {
      serializedTeam[attribute] = team[attribute];
    }
    const players = await team.$relatedQuery("players");
    serializedTeam.players = await Promise.all(
      players.map(async (player) => await PlayerSerializer.getSummary(player))
    );
    return serializedTeam;
  }
}

export default TeamSerializer;
