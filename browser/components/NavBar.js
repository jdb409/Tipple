import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="card text-center card-inverse card-warning">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <Link to='/' className="nav-link active">Cocktails</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ingredients' className="nav-link">Ingredient</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

