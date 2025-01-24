const model = require('../models/connection');
const rsvpModel = require('../models/rsvp');

exports.index = (req,res,next)=>{
    model.find({}).sort({topic: 'asc'})
    .then(connections=>{
        let topics=[];
        let j=0;
        for(let i=0;i<connections.length;i++)
        {
            if(j==0 || topics[j-1]!=connections[i].topic)
            {
                topics[j]=connections[i].topic;
                j++;
            }
        }
        res.render('./connection/connections',{connections: connections, topics: topics});
    })
    .catch(err=>next(err));
    
};

exports.show = (req,res,next)=>{
    let id = req.params.id;
    //console.log(req.params);

    //console.log("hello");
    Promise.all([
        model.findById(id).populate('hostName', 'firstName lastName'),
        rsvpModel.find({ connection: id, rsvp:'yes' }),
      ])
    .then((results)=>{
        const [connection, rsvps] = results;
        //console.log(rsvps);
        if(connection){
            //console.log(connection.id);
            let isAuthor = req.session.user == connection.hostName._id;
            return res.render('./connection/connection',{connection, isAuthor, rsvps});
        }
        else{
            let err = new Error('Cannot find the connection with id '+ id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
};

exports.new = (req,res)=>{
    res.render('./connection/newConnection');
};

exports.create = (req,res,next)=>{
    let connection = new model(req.body); //create a new connection document
    connection.hostName=req.session.user;
    console.log(connection);
    connection.save()//insert the document into database
    .then(connection=>{
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections')
    })
    .catch(err=>{
        if(err.name==='ValidationError')
        {
            req.flash('error',err.message);
            return res.redirect('/back');
            //err.status=404;
        }
        next(err);
    });
    
};

exports.edit = (req,res,next)=>{
    let id = req.params.id;

    model.findById(id)
    .then(connection=>{
        if(connection)
        {
            console.log(connection.startTime);
            res.render('./connection/edit',{connection: connection});
        }
        else{
            let err= new Error('Cannot find the connection with id '+id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

exports.update = (req,res,next)=>{
    let id = req.params.id;
    let connection = req.body;
    //console.log(connection); 

    model.findByIdAndUpdate(id,connection,{userFindAndModify: false, runValidaters: true})
    .then(connection=>{
        if(connection)
        {
            res.redirect('/connections/'+id);
        }
        else{

            let err= new Error('Cannot find the connection with id '+id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

exports.delete = (req,res,next)=>{
    let id = req.params.id;
    console.log(id);

    Promise.all([
        model.findByIdAndDelete(id),
        rsvpModel.deleteMany({connection: id})
      ])
    .then(connection=>{
        if(connection)
        {
            res.redirect('/connections');
        }
        else
        {
            let err= new Error('Cannot find the connection with id '+id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

exports.editRsvp = (req, res, next)=>{
    console.log(req.body.rsvp);
    let id = req.params.id;
    rsvpModel.findOne({connection:id})
    .then(rsvp=>{
        if(rsvp){
            //update
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp=>{
                req.flash('success','Successfully updated RSVP');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                console.log(err);
                if(err.name=== 'validationError'){
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        }
        else{
            //create
            let rsvp = new rsvpModel({
                connection: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp=>{
                req.flash('success', 'successfully created Rsvp');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                req.flash('error',err.message)
                next(err)
            });
        }
    })

}












