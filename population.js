const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const salt=await bcrypt.hash('123',12)
    const result = await course.save();
    console.log(salt)
    console.log(result);
   
}

async function listCourses() {
    const courses = await Course
        .find()
        .select('name author')
        .populate('author', 'name-_id')
    console.log(courses);
}




// createAuthor('Mosh', 'My bio', 'My Website');

createCourse('Node Course', ['602f636d8ee1db1924fc833e', '602f636d8ee1db1924fc833e'])

// listCourses();