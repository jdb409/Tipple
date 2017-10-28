import React from 'react';
import { Link } from 'react-router-dom';

export default function CocktailList(props) {
    const { cocktails } = props;
    console.log(cocktails);

    return (
        <div>
            {cocktails.length < 250 &&
                <div className="card container" style={{ "width": "20rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Result</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        {cocktails.map(drink => {
                            return (
                                <Link  key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}