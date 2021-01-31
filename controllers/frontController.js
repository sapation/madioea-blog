
exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: 'Madiora-Home',
    })
}

exports.getContact = (req, res, next) => {
    res.render('contact', {
        title: 'Madiora-Contact'
    })
}