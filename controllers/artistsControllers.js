const knex = require("../config/knexFile");

exports.seeAllArtists = async (req, res) => {
    try {
        const artists = await knex.select('*').from('artists');
        res.status(200).json({ artists: artists })
    }
    catch (error) {
        res.status(400).json({ error: error.message })

    }
}

exports.allSongsArtistId = async (req, res) => {
    try {
        const artist_id = Number(req.params.id);
        const resultado = await knex.select("id")
            .from("albums")
            .where({ artist_id: artist_id });
        if (resultado.length === 0) {
            return res.status(200).json(`No se ha encontrado ningún album del artista con id ${id}`);
        }
        //arrays de ids de albums del artista
        const ids = resultado.map(item => item.id);
        //buscar canciones con los ids anteriores
        const songs = await knex.select('*')
            .from('songs')
            .whereIn('album_id', ids);

        return res.status(200).json(songs);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
