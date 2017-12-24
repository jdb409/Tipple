import React from 'react';
import { Link } from 'react-router-dom';
import Infinite from 'react-infinite';

export default function CanMake(props) {
    const { cocktails } = props;

    //drinks you can make by available ingredient
    const exact = cocktails.exact;
    const oneOff = cocktails.oneOff;

    return (
        <div className='bg-1'>
            <div className='container'>
                <div className='row canMake' >
                    {exact && exact.length || oneOff && oneOff.length ?
                        <div>
                            <h3>You can make:</h3>
                            <Infinite className="list-group-item" containerHeight={180} elementHeight={30} style={{ "width": "50rem" }}>
                                {exact.map(drink => {
                                    return (
                                        <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                    );
                                })}
                            </Infinite>
                            <h3>You need one more ingredient to make:</h3>
                            <Infinite className="list-group-item" containerHeight={160} elementHeight={30} style={{ "width": "50rem" }}>
                                {oneOff.map(drink => {
                                    return (
                                        <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                    );
                                })}
                            </Infinite>


                        </div>
                        :
                        <h1>Loading</h1>
                    }
                </div>
            </div>
        </div>
    );
}