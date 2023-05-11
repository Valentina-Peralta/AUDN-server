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

exports.seeTop20id = async (req, res) => {
    try {

        const user_id = Number(req.params.id);
        console.log('user_id:', user_id);
        const resultado = await knex
            .select('songs.*', 'albums.name as album_name', 'albums.image as album_image', 'artists.name as artist_name')
            .from('songs')
            .innerJoin('reproductions', 'songs.id', 'reproductions.song_id')
            .innerJoin('albums', 'songs.album_id', 'albums.id')
            .innerJoin('artists', 'albums.artist_id', 'artists.id')
            .where('reproductions.user_id', user_id)
            .groupBy('songs.id', 'albums.name', 'albums.image', 'artists.name')
            .orderBy(knex.raw('COUNT(*)'), 'desc')
            .limit(20);


        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

