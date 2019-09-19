const app = require('../../src/app')

describe('\'movies\' service', () => {
    it('registered the service', () => {
        const service = app.service('movies')
        expect(service).toBeTruthy()
    })
})
