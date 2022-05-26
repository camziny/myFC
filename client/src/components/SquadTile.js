import React from "react"
import { Link } from "react-router-dom"

const SquadTile = ({ id, name, image, assignments }) => {
    return (
        <div className="squadTile">
            <Link to={`/squads/${id}`}>{name}</Link>
            <div className="squadImage">{image}</div>
            <div className="assignments">{assignments}</div>
        </div>
    )
}

export default SquadTile