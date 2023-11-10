const model = require('../models/connection')

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

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid story id');
        err.status = 400;
        return next(err);
    }
    //console.log("hello");
    model.findById(id)
    .then(connection=>{
        if(connection){
            //console.log(connection.id);
            res.render('./connection/connection',{connection: connection});
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
    
    let connection = new model(req.body);
    console.log(connection);
    connection.save()
    .then(()=>res.redirect('/connections'))
    .catch(err=>{
        if(err.name==='ValidationError')
        {
            err.status=404;
        }
        next(err);
    });
    
};

exports.edit = (req,res,next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid story id');
        err.status = 400;
        return next(err);
    }

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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid story id');
        err.status = 400;
        return next(err);
    }  

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

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id)
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












