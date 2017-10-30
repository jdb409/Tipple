import React from 'react';
import { Link } from 'react-router-dom';
import Infinite from 'react-infinite';

export default function CocktailList(props) {
    const { cocktails } = props;


    return (
        <div className='bg-1'>
            <div className='container'>
                {cocktails.length < 250 &&
                    <Infinite className="list-group-item" containerHeight={400} elementHeight={30} style={{ "width": "50rem" }}>

                            {cocktails.map(drink => {
                                return (
                                    <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                                );
                            })}

                    </Infinite>
                }
            </div>
        </div>
    );
}