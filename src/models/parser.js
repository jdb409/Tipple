const fs = require('fs');
const path = require('path');
const axios = require('axios');

// // axios.get(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
// //     .then(res => res.data)
// //     .then(ordinary => {
// //         // let list = [];
// //         // list.push(ordinary);
// //         // // return axios.get(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
// //         // //     .then(res => res.data)
// //         // //     .then(cocktails => {
// //         // //         console.log(cocktails.drinks.length);
// //         // //         list.push(cocktails);
// //         fs.writeFile(path.join(__dirname, 'cocktaildb'), JSON.stringify(ordinary), (err) => {
// //             if (err) throw err;
// //             console.log('written');

// //         })
// //         // })
// //     });


fs.readFile(path.join(__dirname, 'cocktaildb'), 'utf-8', (err, cocktails) => {
    if (err) return err;

    cocktails = cocktails.split('{')
    const seed = {};
    const promises = [];
    // console.log(cocktails[240]);
    for (var j = 2; j < 252; j++) {
        let id = cocktails[j].split(':')[4].split('"')[1];
        promises.push(axios.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`));
    }

    Promise.all(promises)
        // .then(res => res.data)
        .then(drinks => {
            // console.log(drinks[1].data);
            drinks.forEach(drink => {
                let name = drink.data.drinks[0].strDrink;
                let ingredient, i = 1;
                seed[name] = {};
                seed[name].instructions = drink.data.drinks[0].strInstructions;
                seed[name].ingredients = [];
                seed[name].quantity = [];
                seed[name].photo = drink.data.drinks[0].strDrinkThumb;
                ingredient = `strIngredient+${1}`;
                while (drink.data.drinks[0][`strIngredient${i}`] !== undefined) {
                    if (drink.data.drinks[0]) {
                        if (drink.data.drinks[0][`strIngredient${i}`] && drink.data.drinks[0][`strIngredient${i}`].length > 0) {
                            seed[name].ingredients.push(drink.data.drinks[0][`strIngredient${i}`])
                        }

                        if (drink.data.drinks[0][`strMeasure${i}`] && drink.data.drinks[0][`strMeasure${i}`].length > 1) {
                            seed[name].quantity.push(drink.data.drinks[0][`strMeasure${i}`])
                        }
                        i++;
                    }
                }
            });
            console.log(seed);
            fs.writeFile(path.join(__dirname, 'dataFormat.js'), JSON.stringify(seed), (err) => {
                if (err) throw err;
                console.log('written');

            })


        }).catch(console.log)

})

// fs.readFile(path.join(__dirname, 'data'), 'utf-8', (err, cocktails) => {
//     if (err) return err;
//     // console.log(cocktails);
//     cocktails = cocktails.split('\n')
//     fs.writeFile(path.join(__dirname, 'dataFormat.js'), JSON.stringify(cocktails), (err) => {
//                         if (err) throw err;
//                         console.log('written');

//                     })

// })