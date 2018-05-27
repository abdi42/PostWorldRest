var faker = require('faker');

var distanceText = [
  "Here",
  "Very Close",
  "Close",
  "Far Away",
  "Omaha",
  "Papillion",
  "Council Bluff"
]

var times = [
  Math.floor((Math.random() * 60) + 1) + "m",
  Math.floor((Math.random() * 24) + 1) + "h",
  "Just Now",
]

exports.posts = function(){
  var data = []

  for(var i=0;i<10;i++){
    var geoPosted = false;
    var voteCount = 0;
    var d = Math.random() * 100;

    var post = {
      id:faker.random.uuid(),
      username:faker.internet.userName(),
      content:faker.lorem.paragraph(),
      likes:Math.floor((Math.random() * 20) + 1),
      distance:distanceText[Math.floor((Math.random() * 6) + 0)],
      comments:generateComments(),
      time:times[Math.floor((Math.random() * times.length) + 0)],
      votes:[],
      geo:[]
    }

    if(d < 40 || i == 0){
      geoPosted = true;
      post.geo = generateLocation(41.255108,-96.020321,400);
    }


    for(var c=0;c< faker.random.number({min:10, max:100});c++){
      var vote = {
        postId:post.id,
        username:faker.internet.userName(),
        upVoted:true
      }

      voteCount+=1

      post.votes.push(vote);
    }

    post.voteCount = voteCount;

    data.push(post)
  }

  return data;
}

function generateVote(){

}

function generateComments(){
  var data = [];

  for(var i=0;i<Math.floor((Math.random() * 20) + 1);i++){
    var comment = {
      username:faker.internet.userName(),
      content:faker.lorem.paragraph(),
      comments:Math.floor((Math.random() * 40) + 1),
      time:times[Math.floor((Math.random() * times.length) + 0)],
      distance:distanceText[Math.floor((Math.random() * 6) + 0)],
      votes:Math.floor((Math.random() * 100) + 1)
    }

    data.push(comment)
  }

  return data
}

function generateLocation(latitude, longitude, radiusInMeters) {

    var getRandomCoordinates = function (radius, uniform) {
        // Generate two random numbers
        var a = Math.random();
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [
            b * radius * Math.cos(2 * Math.PI * a / b),
            b * radius * Math.sin(2 * Math.PI * a / b)
        ];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    return [longitude + (offsetLongitude * (180 / Math.PI)),latitude + (offsetLatitude * (180 / Math.PI)),]
};
