const knex = require("../config/knexFile");


exports.searchSongs = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm?.trim();

        const songs = await knex('songs')
            .select('songs.name as song_name', 'albums.image as album_image', 'albums.name as album_name', 'artists.name as artist_name')
            .join('albums', 'songs.album_id', 'albums.id')
            .join('artists', 'albums.artist_id', 'artists.id')
            .whereRaw(`LOWER(songs.name) LIKE ?`, `%${searchTerm.toLowerCase()}%`);

        const albums = await knex('songs')
            .select('songs.name as song_name', 'albums.image as album_image', 'albums.name as album_name', 'artists.name as artist_name')
            .join('albums', 'songs.album_id', 'albums.id')
            .join('artists', 'albums.artist_id', 'artists.id')
            .whereRaw(`LOWER(artists.name) LIKE ?`, `%${searchTerm.toLowerCase()}%`);

        const result = songs.concat(albums);

        // const result = songs
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


exports.showSongsByGender = async (req, res) => {
    try {
        const { gender } = req.body;
        const resultado = await knex('songs')
            .select('songs.*', 'albums.image as album_image', 'albums.name as album_name', 'artists.name as artist_name')
            .innerJoin('albums', 'songs.album_id', 'albums.id')
            .innerJoin('artists', 'albums.artist_id', 'artists.id')
            .where('songs.gender', gender);
        if (resultado.length === 0) {
            return res.status(200).json(`No se han encontrado canciones del género ${gender}`);
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
