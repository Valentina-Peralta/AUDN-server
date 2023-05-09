const knex = require("../config/knexFile");

exports.addReproduction = async (req, res) => {
    try {
        const { song_id, user_id } = req.body;
        await knex('reproductions')
            .insert({
                song_id: song_id,
                user_id: user_id
            })

        const reproductions = await knex.select('*').from('reproductions');
        res.status(200).json(`El usuario con id ${user_id} escuchó la canción con id ${song_id}`)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
