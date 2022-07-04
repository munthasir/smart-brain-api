const Clarifai = require('clarifai');

//Face recognition API KEY from Clarifai
const app = new Clarifai.App({
    apiKey: 'cb98d8610943471bb730a61bf8bbd65f'
   });

const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

handleImage = (req, res, db)=> {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(404).json('Unable to get entries'))
}

module.exports = {
    handleImage, 
    handleAPICall
}