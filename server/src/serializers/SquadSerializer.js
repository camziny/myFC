import SquadAssignmentSerializer from "./SquadAssignmentSerializer.js"


class SquadSerializer {
    static getSummary(squad) {
        const allowedAttributes = ["id", "name", "image", "assignments"]
        let serializedSquad = {}
        for (const attribute of allowedAttributes) {
            serializedSquad[attribute] = squad[attribute]
        }
        return serializedSquad
    }
    
    static async getSquadSummaryWithPlayers(squad){
        const allowedAttributes = ["id", "name", "image", "assignments"]
        let serializedSquad = {}
        for (const attribute of allowedAttributes) {
            serializedSquad[attribute] = squad[attribute]
        }

        const assignments = await squad.$relatedQuery("assignments")
        const serializedSquadDetails = await Promise.all(
            assignments.map(async (assignment) => await SquadAssignmentSerializer.getSummary(assignment))
        )
        serializedSquad.details = serializedSquadDetails

        return serializedSquad
    }
}

export default SquadSerializer