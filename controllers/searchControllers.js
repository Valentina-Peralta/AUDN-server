const knex = require("../config/knexFile");


exports.searchSongs = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm?.trim();

        const resultado = await knex('songs')
            .select('songs.name as song_name', 'albums.image as album_image', 'albums.name as album_name', 'artists.name as artist_name')
            .join('albums', 'songs.album_id', 'albums.id')
            .join('artists', 'albums.artist_id', 'artists.id')
            .whereIn('songs.id', function () {
                this.select('songs.id')
                    .from('songs')
                    .whereRaw(`LOWER(songs.name) LIKE ?`, `%${searchTerm.toLowerCase()}%`)
                    .orWhereIn('songs.album_id', function () {
                        this.select('albums.id')
                            .from('albums')
                            .whereRaw(`LOWER(albums.name) LIKE ?`, `%${searchTerm.toLowerCase()}%`);
                    });
            })
            .orWhereIn('albums.artist_id', function () {
                this.select('artists.id')
                    .from('artists')
                    .whereRaw(`LOWER(artists.name) LIKE ?`, `%${searchTerm.toLowerCase()}%`);
            });

        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
