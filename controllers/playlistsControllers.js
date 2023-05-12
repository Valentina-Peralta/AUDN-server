const knex = require("../config/knexFile");



exports.showPlaylistsId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex.select("*")
            .from("playlists_users")
            .innerJoin("playlists", "playlists_users.playlist_id", "=", "playlists.id")
            .where({ user_id: id });
        if (resultado.length === 0) {
            return res.status(200).json({ error: 'no se han encontrado playlists del usuario' });
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.showPlaylistSongs = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex.select(
            "songs.*",
            "albums.image",
            "playlists.name as playlist_name"
        )
            .from("playlists_songs")
            .innerJoin("songs", "playlists_songs.song_id", "=", "songs.id")
            .innerJoin("albums", "songs.album_id", "=", "albums.id")
            .innerJoin("playlists", "playlists_songs.playlist_id", "=", "playlists.id")
            .where({ playlist_id: id });
        if (resultado.length === 0) {
            return res
                .status(200)
                .json(`No se ha encontrado ninguna playlist con id ${id}`);
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.showAllSongs = async (req, res) => {
    try {
        const resultado = await knex.select("*")
            .from("songs")
        if (resultado.length === 0) {
            return res.status(200).json(`No se han encontrado canciones`);
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

/*
agregar una playlist a partir del id de las canciones:
1) agregar un registro a la tabla playlists: name, duration(null)
2)agregar un registro a la tabla playlists_users: playlist_id, user_id
3)agregar, POR CADA CANCIÓN un registro a la tabla playlists_songs: song_id,playlist_id
*/

exports.addPlaylist = async (req, res) => {
    try {
        //registro en la tabla playlists
        const { name, user_id, songs_id } = req.body;
        await knex('playlists')
            .insert({
                name: name
            })

        //obtener el id de la playlist
        const playlist = await knex.select('*').from('playlists').orderBy('id', 'desc').limit(1);
        const playlist_id = playlist[0].id

        //vincula la playlist agregada con el usuario
        await knex('playlists_users')
            .insert({
                playlist_id: playlist_id,
                user_id: user_id
            })

        //Recorrer el array de id 'songs_id' y hacer un insert en la tabla playlists_songs
        songs_id.forEach(async (song_id) => {
            await knex('playlists_songs').insert({
                playlist_id: playlist_id,
                song_id: song_id
            });
        });

        res.status(200).json({ 'playlist': playlist, 'user_id': user_id })
        //       res.status(200).json({ inmuebles: inmuebles })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.addEmptyPlaylist = async (req, res) => {
    try {
        //registro en la tabla playlists
        const { name, user_id } = req.body;
        await knex('playlists')
            .insert({
                name: name
            })

        //obtener el id de la playlist
        const playlist = await knex.select('*').from('playlists').orderBy('id', 'desc').limit(1);
        const playlist_id = playlist[0].id

        //vincula la playlist agregada con el usuario
        await knex('playlists_users')
            .insert({
                playlist_id: playlist_id,
                user_id: user_id
            })


        res.status(200).json({ 'playlist': playlist, 'user_id': user_id })
        //       res.status(200).json({ inmuebles: inmuebles })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
