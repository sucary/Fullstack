const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://v568813627:${password}@cluster0.ysukwut.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 5) {
    const note = new Note({
        content: process.argv[3],
        important: process.argv[4]
      })

    note.save().then(result => {
        console.log('note saved!')
      })
}

else {
    Note.find({}).then(result => {
        console.log('Here are notes stored:')
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
}



