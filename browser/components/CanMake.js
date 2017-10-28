import React from 'react';
import { Link } from 'react-router-dom';

export default function CanMake(props) {
    const { cocktails } = props;
    const exact = cocktails.exact;
    const oneOff = cocktails.oneOff;


    return (
        <div className = 'container'>
            {exact && exact.length || oneOff && oneOff.length ?
                <div className='row' >
                    <div className='col-6'>
                        <div className="card" style={{ "width": "20rem;" }}>
                            <div className="card-block">
                                <h4 className="card-title">You can make:</h4>
                                <ul className="list-group list-group-flush">
                                    {exact.map(drink => {
                                        return (
                                            <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="card" style={{ "width": "20rem;" }}>
                            <div className="card-block">
                                <h4 className="card-title">You need one more ingredient to make:</h4>
                                <ul className="list-group list-group-flush">
                                    {oneOff.map(drink => {
                                        return (
                                            <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                :
                null
            }
        </div>
    );
}