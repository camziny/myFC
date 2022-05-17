import React from 'react'
import { Link } from "react-router-dom"

const PlayerTile = ({ firstName, lastName, postion, id }) => {
    return (
        <li className="callout">
            <Link to={`/players/${id}`}>
            </Link>
        </li>
    )
}

export default PlayerTile