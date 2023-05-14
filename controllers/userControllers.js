const knex = require("../config/knexFile");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.emailCheck = async (req, res) => {
    try {
        const { email } = req.body;

        //corroborar que el usuario no existe, si no existe agregarlo
        const resultado = await knex("users").where({ email: email });
        if (resultado.length) {
            return res.status(400).json({ error: "El usuario ya se encuentra registrado" });
        } else {
            return res.status(200).json({ message: "El usuario no se encuentra registrado" });
        }


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

exports.signup = async (req, res) => {
    try {
        const { email, password, user_name } = req.body;
        //encriptamos la password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //corroborar que el usuario no existe, si no existe agregarlo
        const resultado = await knex("users").where({ email: email });
        if (resultado.length) {
            return res.status(400).json({ error: "El usuario ya se encuentra registrado" });
        }

        await knex('users').insert({
            email: email,
            name: user_name,
            user_name: user_name,
            password: hash
        });

        res.status(200).json(`se agregó el usuario ${email}`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const resultado = await knex("users ").where({ email: email }) //cambiar para que también busque por user_name
        if (!resultado.length) {
            return res.status(404).json({ error: "el usuario no se encuentra registrado" })
        }
        const validPassword = await bcrypt.compare(password, resultado[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Email y/o contraseña incorrectos" })
        }
        //crear JWT token y dárselo al cliente
        delete resultado[0].password; // eliminamos la propiedad password del objeto resultado

        const payload = {
            name: resultado[0].name,
            email: resultado[0].email,
            user_name: resultado[0].user_name,
            image: resultado[0].image,
            cupid: resultado[0].cupid,
            contextual: resultado[0].contextual,

        }
        const secret = process.env.TOKEN_SECRET
        const token = jwt.sign(payload, secret)
        res.status(200).json({
            mensaje: "el usuario ha ingresado correctamente", token: token,
            name: name, email: email, user: resultado[0]

        })
    }

    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

exports.seeCupid = async (req, res) => {
    try {
        const user_id = parseInt(req.body.user_id);

        const resultado = await knex('users')
            .select('cupid')
            .where('id', user_id)
            .first();

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.seeContextual = async (req, res) => {
    try {
        const user_id = parseInt(req.body.user_id);

        const resultado = await knex('users')
            .select('contextual')
            .where('id', user_id)
            .first();

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

exports.updateCupid = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const newCupidValue = req.body.cupid_value;
        const updatedUser = await knex('users')
            .where('id', userId)
            .update({ cupid: newCupidValue }, ['id', 'name', 'email', 'cupid']);

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.updateContextual = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const newContextualValue = req.body.contextual_value;
        const updatedUser = await knex('users')
            .where('id', userId)
            .update({ contextual: newContextualValue }, ['id', 'name', 'email', 'contxtual']);

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
