const notes = []

const addNote = (note) => {
  notes.push(note)
}

const getNotes = () => {
  return notes
}

module.exports = {
  addNote,
  getNotes,
}
