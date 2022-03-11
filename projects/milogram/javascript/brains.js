var
    counter1 = 0,
    counter2 = 0,
    counter3 = 0,
    counter4 = 0,
    counter5 = 0;

const user = {
    firstName: 'Greg',
    lastName: 'Thompson',
    followers: [
        'milo',
        'majohns95',
        'buddy',
        'koda',
        'pepper the cat',
    ],
    profilePic: 'https://media-exp1.licdn.com/dms/image/C4E03AQE-DKxuMqU-jw/profile-displayphoto-shrink_400_400/0/1587741129116?e=1642032000&v=beta&t=HdlSDnfXfYEGxhgU48wV6_jGfeNPjyMp-4uh_WUEZ28',
};
    
function likePhoto(num) {
    if (num === 1) {
        counter1++;
        document.getElementById("likeCount1").innerHTML = counter1;
    } else if (num === 2) {
        counter2++;
        document.getElementById("likeCount2").innerHTML = counter2;
    } else if (num === 3) {
        counter3++;
        document.getElementById("likeCount3").innerHTML = counter3;
    } else if (num === 4) {
        counter4++;
        document.getElementById("likeCount4").innerHTML = counter4;
    } else if (num === 5) {
        counter5++;
        document.getElementById("likeCount5").innerHTML = counter5;
    }
}

// debugger;
// ​setTimeout(function(){ document.getElementById("first-name").innerHTML = user.firstName;}, 3000);
// ​setTimeout(function(){ document.getElementById("last-name").innerHTML = user.lastName;}, 3000);
// ​setTimeout(function(){ document.getElementById("followers").innerHTML = "Followers: " + user.followers.length;}, 3000);
// ​setTimeout(function(){ $("#profile-pic").attr("src", user.profilePic);}, 3000);