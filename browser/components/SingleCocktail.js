import React from 'react';

export default function SingleCocktail(props) {
    const { cocktail } = props;

    return (
        <div>
            <div className="card container" style={{ "width": "20rem" }}>
                <div className="card-body">
                    <h4 className="card-title">{cocktail.name}</h4>
                    <p className="card-text">{cocktail.instructions}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {cocktail.ingredientList && cocktail.ingredientList.map(ing => {
                        return (
                            <li className="list-group-item" key={ing}>{ing}</li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}