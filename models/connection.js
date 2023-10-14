const {v4: uuidv4} = require('uuid');

const connections=[{
    id: '1',
    topic: 'Cultural Events',
    title: 'Musical Fest', 
    host: 'UNC Charlotte',
    details: 'It is a three-day musical extravaganza that brings together music lovers from all walks of life to celebrate the power of music and unity. With an eclectic lineup of artists from various genres, mouthwatering food vendors, and a vibrant arts market, this festival promises an unforgettable experience for all attendees.',
    where: 'University Recreation Center',
    when: '2023-10-14',
    start: '17:30',
    end: '19:30',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
},
{
    id: '2',
    topic: 'Academic Workshops',
    title: 'Career Fair', 
    host: 'UNC Charlotte',
    details: 'The UNC Charlotte Career Fair is a flagship event that serves as a pivotal moment for students and employers alike. Held on the vibrant campus of the University of North Carolina at Charlotte, this career fair offers a unique opportunity for students to explore a multitude of career paths and for employers to connect with top talent.',
    where: 'University Career center',
    when: '2023-10-21',
    start: '10:00',
    end: '12:30',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzQKYyLv3_pWwOCjrItk6VvIQARO6Gh4V0g&usqp=CAU'
},
{
    id: '3',
    topic: 'Cultural Events',
    title: 'Comedy Night', 
    host: 'UNC Charlotte',
    details: 'Get ready to laugh until your sides hurt at the UNC Charlotte Comedy Night! This event promises an unforgettable evening of humor, entertainment, and good times, right on the vibrant campus of the University of North Carolina at Charlotte.',
    where: 'Cone Building',
    when: '2023-10-27',
    start: '20:00',
    end: '21:30',
    image: 'https://media.istockphoto.com/id/465824970/vector/stand-up-comedy-night-stage-with-neon-sign-and-brick-wall.jpg?s=170667a&w=0&k=20&c=rojDaBqMcbeJcPe3Ee5gLXS0dPACIKAdj6ALYOXtEmE='
},
{
    id: '4',
    topic: 'Cultural Events',
    title: 'Talent Show', 
    host: 'UNC Charlotte',
    details: 'Get ready to witness a dazzling display of talent at the UNC Charlotte Talent Show! This much-anticipated event promises an evening filled with extraordinary performances, heartfelt moments, and the celebration of the incredible skills and creativity of our university brightest stars.',
    where: 'Grigg Hall',
    when: '2023-10-21',
    start: '16:00',
    end: '18:00',
    image: 'https://marketplace.canva.com/EADaoOrqs5U/1/0/571w/canva-retro-musical-instruments-talent-show-flyer-QfijiSD9k0w.jpg'
},
{
    id: '5',
    topic: 'Academic Workshops',
    title: 'Hackathon', 
    host: 'UNC Charlotte',
    details: 'Prepare to unleash your creativity, problem-solving skills, and coding prowess at the UNC Charlotte Hackathon! This exciting event is where aspiring tech wizards, developers, and innovators gather to turn their wildest ideas into reality. ',
    where: 'Cato Building',
    when: '2023-10-21',
    start: '10:00',
    end: '22:00',
    image: 'https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg'
},
{
    id: '6',
    topic: 'Academic Workshops',
    title: 'Research Paper Writing Workshop', 
    host: 'UNC Charlotte',
    details: 'The Research Paper Writing Workshop equips you with the skills and knowledge needed to excel in your academic journey. Whether you are working on assignments, theses, or research publications, this workshop provides invaluable guidance. Join us in honing your research paper writing skills and take a significant step toward academic excellence!',
    where: 'Duke Centinnial Hall',
    when: '2023-10-25',
    start: '9:00',
    end: '13:00',
    image: 'https://i.ytimg.com/vi/3Fx1j-UZC4U/maxresdefault.jpg'
}]; 

exports.find = function(){
    return connections;
}

exports.findTopics = function(){
    let topics=[];
    connections.forEach(connection => {
        if(topics.indexOf(connection.topic)==-1)
        {
            topics.push(connection.topic);
        }
    });
    topics.sort();
    return topics;
}

exports.findById = function(id){
    return connections.find(connection=> connection.id===id);
};

exports.save = function(connection){
    connection.id=uuidv4();
    connections.push(connection);
};

exports.updateById = function(id, newConnection){
    let connection = connections.find(connection=> connection.id===id);

    if(connection){
        connection.topic=newConnection.topic;
        connection.title=newConnection.title;
        connection.host=newConnection.host;
        connection.details=newConnection.details;
        connection.when=newConnection.when;
        connection.where=newConnection.where;
        connection.start=newConnection.start;
        connection.end=newConnection.end;
        return true;
    }
    else{
        return false;
    }
}

exports.deleteById = function(id){
    let idx = connections.findIndex(connection=>connection.id===id);
    
    if(idx!=-1)
    {
        console.log(idx);
        connections.splice(idx,1);
        return true;
    }
    else{
        return false;
    }
}