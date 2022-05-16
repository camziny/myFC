import React from "react"
import { Link } from "react-router-dom"

const TeamTile = ({ id, title }) => {
    return (
        <div className="callout">
            <Link to={`/teams/${id}`}> {title}</Link>
        </div>
    )
}

export default TeamTile