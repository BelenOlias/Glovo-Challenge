const cocktailsAPI = new APIhandler('https://www.thecocktaildb.com/api')

window.addEventListener('load', () => {

    document.getElementById('fetch').addEventListener('click', function () {
         
        document.querySelector('.drinkSection').classList.toggle('unseen')

        cocktailsAPI
            .getCocktailsBeginningWithG()
            .then(cocktails => {
                let list = cocktails.data.drinks
                let text1 = ''
                let text2 = ''

                //Filter cocktails with more than 4 ingredients
                list = list.filter(elm => elm.strIngredient5)

                let alcoholic = []
                let nonAlcoholic = []

                //Parse the list with ingredients and measures

                list.forEach(elm => {
                    let ingredients = []
                    let measures = []
                    let pairs = {}

                    for (let prop in elm) {
                        if (prop.includes('strIngredient') && elm[prop]) {
                            ingredients.push(elm[prop])
                        }
                        if (prop.includes('strMeasure') && elm[prop]) {
                            measures.push(elm[prop])
                        }
                    }

                    for (let i = 0; i < ingredients.length; i++) {
                        let ingredient = ingredients[i]
                        pairs[ingredient] = measures[i]
                    }

                    elm.ingredients = pairs

                    //Split the cocktails in alcoholic and non-alcoholic
                    
                    if (elm.strAlcoholic === 'Alcoholic') {
                        alcoholic.push(elm)
                    } else {
                        nonAlcoholic.push(elm)
                    }

                })

                alcoholic.forEach(elm => {
                    let a = ''
                    let ing = elm.ingredients
                    for (let prop in ing) {
                        a += `${prop} - ${ing[prop]}<br> `
                    }

                    text1 += `<ul>
                <li>Name: ${elm.strDrink}</li>
                <li>Id: ${elm.idDrink}</li>
                <li>Ingredients: ${a} </li>
                </ul>`
                })

            
                nonAlcoholic.forEach(elm => {
                    let a = ''
                    let ing = elm.ingredients
                    for (let prop in ing) {
                        a += `${prop} - ${ing[prop]}<br> `
                    }
                    
                    text2 += `<ul>
                <li>${elm.strDrink}</li>
                <li>${elm.idDrink}</li>
                <li>Ingredients: ${a}</li>
                </ul>`
                })
            
        
                document.querySelector('.subtitle').innerHTML = 'Number of cocktails: ' + list.length
                document.querySelector('.drinksList').innerHTML = text1
                document.querySelector('.freeDrinks').innerHTML = text2
            })
            .catch(err => console.log('There was an error!', err))

    })

})

