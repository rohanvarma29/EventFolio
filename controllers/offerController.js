const offerModel = require('../models/offers');

exports.create = (req,res,next)=>{
    let offer = new offerModel(req.body);
    offer.status = 'pending';
    offer.user = req.session.user;
    offer.connection = req.params.id;
    console.log(req.session.user);
    offer.save()
    .then(offer=>{
        req.flash('success', 'Offer has been made successfully');
        res.redirect('/connections/'+req.params.id);
    })
    .catch(err=>
        {
            if(err.name==='ValidationError')
            {
                req.flash('error',err.message);
                return res.redirect('/back');
                //err.status=404;
            }
            next(err)
        });
}