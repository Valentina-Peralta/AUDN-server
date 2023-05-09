const knex = require("../config/knexFile");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.showPlaylistsId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex.select("*")
            .from("playlists_users")
            .innerJoin("playlists", "playlists_users.playlist_id", "=", "playlists.id")
            .where({ user_id: id });
        if (resultado.length === 0) {
            return res.status(200).json(`No se ha encontrado ninguna playlist del usuario con id ${id}`);
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
exports.showPlaylistSongs = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultado = await knex.select("*")
            .from("playlists_songs")
            .innerJoin("songs", "playlists_songs.song_id", "=", "songs.id")
            .where({ playlist_id: id });
        if (resultado.length === 0) {
            return res.status(200).json(`No se ha encontrado ninguna playlist con id ${id}`);
        }
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}