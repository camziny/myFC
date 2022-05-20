import React from "react"
import { Link } from "react-router-dom"

const SquadTile = ({ id, name }) => {
    return (
        <div className="squadTile">
            <Link to={`/squads/${id}`}>{name}</Link>
        </div>
    )
}

export default SquadTile