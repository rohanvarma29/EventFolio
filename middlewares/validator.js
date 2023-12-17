const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'first name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'password must be at least 8 characters and atmost 64 characters').isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'password must be at least 8 characters and atmost 64 characters').isLength({ min: 8, max: 64 })];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else {
        return next();
    }
}

exports.validateConnection = [body('topic', 'topic cannot be empty').notEmpty().trim().escape(),
body('title', 'title cannot be empty').notEmpty().trim().escape(),
body('details', 'details cannot be empty').notEmpty().trim().escape(),
body('place', 'where cannot be empty').notEmpty().trim().escape(),
body('date', 'Date should be valid and it should be after today').notEmpty().custom(value => {
    if (!Date.parse(value)) {
      throw new Error('Invalid date format');
    }
    return true;
  }).isAfter(),
body('startTime', 'Start time cannot be empty').notEmpty().matches(/^(\d{2}):(\d{2})$/).withMessage('Invalid time format').trim().escape(),
body('endTime', 'End time cannot be empty').notEmpty().matches(/^(\d{2}):(\d{2})$/).withMessage('Invalid time format').trim().escape(),
body()
    .custom((value, { req }) => {
        const start = req.body.start;
        const end = req.body.end;

        // Check if end time is after start time
        if (start && end && start >= end) {
            throw new Error('End time must be after start time');
        }

        return true;
    }),
body('imageURL', 'Image should be vaild url and not empty').notEmpty().isURL()
];

exports.validateRSVP = [
    body('rsvp', 'rsvp cannot be empty. It should be either YES | NO | MAYBE').notEmpty().trim().escape().toLowerCase().isIn(['yes', 'no', 'maybe'])
]