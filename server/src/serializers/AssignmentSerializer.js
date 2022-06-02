import PlayerSerializer from "./PlayerSerializer.js"

class AssignmentSerializer {
    static async getSummary(assignment) {
        const allowedAttributes = ["id", "position"]
        let serializedAssignment = {}
        for (const attribute of allowedAttributes) {
            serializedAssignment[attribute] = assignment[attribute]
        }
        const relatedAssignment = await assignment.$relatedQuery("player")

        const serializedPlayer = PlayerSerializer.getSummary(relatedAssignment)
        serializedAssignment.player = serializedPlayer

        return serializedAssignment
    }
}

export default AssignmentSerializer