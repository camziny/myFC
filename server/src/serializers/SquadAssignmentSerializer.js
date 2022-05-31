import PlayerSerializer from "./PlayerSerializer.js"

class SquadAssignmentSerializer {
    static async getSummary(squadAssignment) {
        const allowedAttributes = ["id", "position"]
        let serializedSquadAssignment = {}
        for (const attribute of allowedAttributes) {
            serializedSquadAssignment[attribute] = squadAssignment[attribute]
        }
        const relatedAssignment = await squadAssignment.$relatedQuery("player")

        const serializedAssignment = PlayerSerializer.getSummary(relatedAssignment)
        serializedSquadAssignment.player = serializedAssignment

        return serializedSquadAssignment
    }
}

export default SquadAssignmentSerializer