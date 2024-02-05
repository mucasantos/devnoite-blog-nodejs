const {check, body } = require("express-validator");

module.exports = {
    validateEmail: check("email")
        .isEmail()
        .withMessage("Digite um email válido!")
        .custom((value, { req }) => {
            if (value === "juca@email.com") {
                throw new Error("Email já consta no banco de dados!");
            }
            return true;
        }),

    validateTitle: body("title")
        .isLength({ min: 5 })
        .withMessage("O título precisa de pelo menos 5 caracters!")


}