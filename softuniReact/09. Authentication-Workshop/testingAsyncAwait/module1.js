import * as gameService from './module2'

gameService.getAll()
    .then(result => {
        console.log(result)
    })