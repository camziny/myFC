import PlayerSerializer from "./PlayerSerializer.js"

class SquadAssignmentSerializer {
    static async getSummary(assignment) {
        const allowedAttributes = ["id", "playerId", "squadId"]
        let serializedSquadAssignment = {}
        for (const attribute of allowedAttributes) {
            serializedSquadAssignment[attribute] = squadAssignment[attribute]
        }
        const relatedAssignment = await assignment.$relatedQuery("players")

        const serializedAssignment = PlayerSerializer.getSummary(relatedAssignment)
        serializedSquadAssignment.assignment = serializedAssignment

        return serializedSquadAssignment
    }
}

export default SquadAssignmentSerializer