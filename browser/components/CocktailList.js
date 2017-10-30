import React from 'react';
import { Link } from 'react-router-dom';
import Infinite from 'react-infinite';

export default function CocktailList(props) {
    const { cocktails } = props;


    return (
        <div className='bg-1'>
            <div className='container'>
                {cocktails.length < 250 &&
                    <Infinite className="list-group" containerHeight={350} elementHeight={30} style={{ "width": "50rem" }}>
                        <ul className="list-group-item">
                            {cocktails.map(drink => {
                                return (
                                    <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                );
                            })}
                        </ul>
                    </Infinite>
                }
            </div>
        </div>
    );
}