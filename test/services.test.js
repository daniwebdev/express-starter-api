const db = require('../build/services/db.service').db

it('test connection to databse must connect', (done) => {


    db.raw('SELECT 1').then(() => {
        expect(true).toBe(true)
        done()
    }).catch(() => {
        expect(true).toBe(false)        
    })

})