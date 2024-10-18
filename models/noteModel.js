const pool = require('../config/db');


// Create category
const createNote = async (p_user_id, p_title, p_description, p_is_favorite) => {
    const query = 'SELECT * FROM create_note($1, $2, $3, $4)';
    const values = [p_user_id, p_title, p_description, p_is_favorite];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};



// Get note by userid
const getNotesById = async (p_user_id) => {
    const query = 'SELECT * FROM get_notes_by_userid($1)';
    const values = [p_user_id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Update note isfavorite status
const updateisFavoriteStatus = async (p_note_id, pis_favorite) => {
    const query = 'SELECT * FROM update_note_isfavorite_state($1, $2)';
    const values = [p_note_id, pis_favorite];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};


module.exports = {
    createNote,
    getNotesById,
    updateisFavoriteStatus,
}
