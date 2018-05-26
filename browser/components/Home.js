import React from 'react';

export default function Home() {
    return (
        <div id="mycarousel" className="carousel">
            <div className="carousel-inner">
                <img src={'../../public/cocktail.jpg'} />
                <div className="carousel-caption">
                    <h1>Tipple</h1>
                    <h3>Find cocktails based on your bar </h3>
                </div>

            </div>
        </div>
    );
}