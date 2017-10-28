import React from 'react';
import { Link } from 'react-router-dom';

export default function CanMake(props) {
    const { cocktails } = props;
    const exact = cocktails.exact;
    const oneOff = cocktails.oneOff;


    return (
        <div>
            {exact && exact.length &&
                <div className="card container" style={{ "width": "20rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Result</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        <p>You can make</p>
                        {exact.map(drink => {
                            return (
                                <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                            );
                        })}
                    </ul>
                    <ul className="list-group list-group-flush">
                        <p>You need one ingredient more to make:</p>
                        {oneOff.map(drink => {
                            return (
                                <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}