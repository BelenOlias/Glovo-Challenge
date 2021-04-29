class APIhandler {

    constructor() {
        this.app = axios.create({
            baseURL: 'https://www.thecocktaildb.com/api'
        })
    }

    //Getting all cocktails which first letter is G

    getCocktailsBeginningWithG() {
        return this.app.get('/json/v1/1/search.php?f=G')
    }


}