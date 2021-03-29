const Subject = reqruie('../models/subject-model')

createSubject = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'You must provide a subject',
        })
    }

    const subject = new Subject(body)

    if (!subject){
        return res.status(400).json({success: false, error: err})
    }

    subject
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: subject._id,
                message: 'Subject created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Subject not created!",
            })
        })
      

}

updateSubject = async (req, res) => {
    const body = req.body

    if(!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Subject.findOne({_id: req.params.id}, (err, subject) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Subject not found!',
            })
        }
        subject.language = body.language
        subject.category = body.category
        subject.title = body.category
        subject.content = body.content
        subject
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: subject._id,
                    message: 'Subject updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Subject not update!',
                })
            })

    })


}