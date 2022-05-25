import SquadAssignmentSerializer from "./SquadAssignmentSerializer.js"


class SquadSerializer {
    static async getSummary(squad) {
        const allowedAttributes = ["id", "name", "assignments"]
        let serializedSquad = {}
        for (const attribute of allowedAttributes) {
            serializedSquad[attribute] = squad[attribute]
        }
        return serializedSquad
    }

    static async getSquadSummaryWithAssignments(squad){
        const allowedAttributes = ["id", "name", "assignments"]
        let serializedSquad = {}
        for (const attribute of allowedAttributes) {
            serializedSquad[attribute] = squad[attribute]
        }

        const squadDetails = await squad.$relatedQuery("squadDetails")
        const serializedSquadDetails = await Promise.all(
            squadDetails.map(async (squadDetail) => await SquadAssignmentSerializer.getSummary(squadDetail))
        )
        serializedSquad.details = serializedSquadDetails

        return serializedSquad
    }
}

export default SquadSerializer