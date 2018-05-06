var faker = require('faker');

exports.posts = function(){
  var data = []

  var distanceText = [
    "Here",
    "Very Close",
    "Close",
    "Far Away",
    "Omaha",
    "Papillion",
    "Council Bluff"
  ]


  for(var i=0;i<10;i++){
    var post = {
      username:faker.internet.userName(),
      content:faker.lorem.paragraph(),
      likes:Math.floor((Math.random() * 20) + 1),
      distance:distanceText[Math.floor((Math.random() * 6) + 0)],
      comments:generateComments(),
      votes:Math.floor((Math.random() * 100) + 1)
    }

    data.push(post)
  }

  return data;
}


function generateComments(){
  var data = [];

  for(var i=0;i<Math.floor((Math.random() * 20) + 1);i++){
    var comment = {
      username:faker.internet.userName(),
      content:faker.lorem.paragraph(),
      comments:Math.floor((Math.random() * 40) + 1),
      votes:Math.floor((Math.random() * 100) + 1)
    }

    data.push(comment)
  }

  return data
}
