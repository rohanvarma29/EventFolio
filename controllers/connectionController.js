const model = require('../models/connection')

exports.index = (req,res)=>{
    let connections = model.find();
    //console.log(connections);
    let topics = model.findTopics();
    res.render('./connection/connections',{connections: connections, topics: topics});
};

exports.show = (req,res,next)=>{
    let id = req.params.id;
    let connection= model.findById(id);
    if(connection){
        res.render('./connection/connection',{connection: connection});
    }
    else{
        let err = new Error('Cannot find the connection with id '+ id);
        err.status=404;
        next(err);
    }
};

exports.new = (req,res)=>{
    res.render('./connection/newConnection');
};

exports.create = (req,res)=>{
    
    let connection = req.body;
    console.log(connection);
    model.save(connection);
    res.redirect('/connections');
};

exports.edit = (req,res,next)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection)
    {
        res.render('./connection/edit',{connection: connection});
    }
    else{
        let err= new Error('Cannot find the connection with id '+id);
        err.status=404;
        next(err);
    }
}

exports.update = (req,res,next)=>{
    let id = req.params.id;
    let connection = req.body;
    if(model.updateById(id,connection))
    {
        res.redirect('/connections/'+id);
    }
    else{

        let err= new Error('Cannot find the connection with id '+id);
        err.status=404;
        next(err);
    }
}

exports.delete = (req,res,next)=>{
    let id = req.params.id;
    console.log(id);
    if(model.deleteById(id))
    {
        res.redirect('/connections');
    }
    else
    {
        let err= new Error('Cannot find the connection with id '+id);
        err.status=404;
        next(err);
    }
}












