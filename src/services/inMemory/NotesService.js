const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

// membuat class yang memmiliki property sebagai array
class NotesService {
    constructor() {
        this._notes = [];
    }
    // membuat fungsi CRUD untuk mengelola data pada this._notes
    addNote({ title, body, tags }) {
      const id = nanoid(16);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      
      const newNote = {
          title, tags, body, id, createdAt, updatedAt,
      };

      this._notes.push(newNote);

      //mengecek newNote masuk ke this._notes dengan fungsi filter
      const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

      if (!isSuccess) {
          throw new InvariantError('Catatan gagal ditambahkan');
      }

      return id;
    }

    getNotes() {
        return this._notes;
    }
    // membuat metod getNoteById dengan parameter id untuk membaca note based on id dengan fungsi filter
    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return note;
    }

    //membuat fungsi editNoteById yg menerima 2 parameter: id dan data note terbaru dalam bentuk objek (payloadnya diambil sebagian)
    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan, Id tidak ditemukan');   
        }
        
        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    //menghapus note dari array this._notes based on id
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }

        this._notes.splice(index, 1);
    }
}

module.exports = NotesService;