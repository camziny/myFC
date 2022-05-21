
class SquadSerializer {
    static async getSummary(squad) {
        const allowedAttributes = ["id", "name", "positions"]
        let serializedSquad = {}
        for (const attribute of allowedAttributes) {
            serializedSquad[attribute] = squad[attribute]
        }
        return serializedSquad
    }
}

export default SquadSerializer