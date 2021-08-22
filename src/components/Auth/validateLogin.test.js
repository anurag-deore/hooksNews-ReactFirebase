const validateLogin = require("./validateLogin")
// @ponicode
describe("validateLogin.default", () => {
    test("0", () => {
        let callFunction = () => {
            validateLogin.default({ email: { length: 0 }, password: { length: 1 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            validateLogin.default({ email: { length: 3 }, password: { length: 6 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            validateLogin.default({ email: { length: 2 }, password: { length: 0 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            validateLogin.default({ email: { length: 5 }, password: { length: 2 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            validateLogin.default({ email: { length: 2 }, password: { length: 2 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            validateLogin.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
