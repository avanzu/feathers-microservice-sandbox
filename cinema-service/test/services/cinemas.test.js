const app = require('../../src/app')

describe('\'cinemas\' service', () => {
    it('registered the service', () => {
        const service = app.service('cinemas')
        expect(service).toBeTruthy()
    })
})
