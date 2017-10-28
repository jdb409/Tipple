import React from 'react';

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
                                <li className="list-group-item" key={drink.id}>{drink.name}</li>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}