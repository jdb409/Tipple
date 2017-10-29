import React from 'react';
import { Link } from 'react-router-dom';
import Infinite from 'react-infinite';

export default function CocktailList(props) {
    const { cocktails } = props;
    

    return (
        <div className='container'>
        <br/>
        
            {cocktails.length < 250 &&
                <Infinite className="card container" containerHeight={350} elementHeight={30} style={{ "width": "50rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Result</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        {cocktails.map(drink => {
                            return (
                                <Link key={drink.id} to={`/cocktail/${drink.id}`}><li className="list-group-item">{drink.name}</li></Link>
                            );
                        })}
                    </ul>
                </Infinite>
            }
        </div>
    );
}