const express = require('express');
var mysql = require('mysql');
const app = express();

app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
// var sess = require('express-session');
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.set('port',3000);
// app.use(flash());

//app.use(express.static('./assets'))
app.use(express.static('./'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(sess({
//   name: 'JSESSION',
//   key : 'username',W
//   secret: 'MYSECRETISVERYSECRET',
//   cookie:{expires: 60 * 60 * 1000

//     },
//   resave: false,
//   saveUninitialized: false
// }));
// app.use((req, res, next) => {
//   if (req.cookies.username && !req.session.username) {
//       res.clearCookie('username');
//   }
//   next();
// });
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password:'rohit0203',
database:'psave'
});


connection.connect(function(error){
  if(error){
    console.log('Error');

  }
  else{
    console.log('Connected');

  }
});
// module.exports = function(passport){


//   passport.serializeUser(function(user,done){
//     done(null,user.username);
//   });
//   passport.deserializeUser(function(username,done){
//    connection.query("select * from users where username="+username,function(err,rows){
//      done(err,rows[0]);
//    });
//   });
// passport.use('local-login',new LocalStrategy({
//   usernameField:'username',
//   passwordField:'password',
//   passReqToCallback:true
// },
// function(req,username,password,done){
//   connection.query("Select * from users where username='"+email+"'",function(err,rows){
//     console.log(rows);
//     console.log("above row object");
//     if(err) return done(err);
//     if(!rows.length){
//       return done(null,false,req.flash('loginMessage','No user found'));

//     }
//       if(!(rows[0].password==password)){
//         return done(null,false,req.flash('loginMessage','Oops! Wrong password.'));
//        } return done(null,rows[0]);

//     });
//   }));
// };
//-----------------------------------------------------------------------------------------------------------

app.get('/',function(req,resp){
  resp.sendFile('index.html',{root: __dirname})
});
app.get('/home',function(req,resp){
  resp.redirect('mainejs')
});
app.get('/log',function(req,res){

res.sendFile('register.html',{root: __dirname});
});
app.get('/about',function(req,res){

res.sendFile('aboutus.html',{root: __dirname});
});
app.post('/reg',function(req,res){
  var sql="insert into users values('"+req.body.usname+"','"+req.body.phno+"','"+req.body.pass+"')"
  console.log(req.body);
  connection.query(sql)
  res.redirect('http://35.165.20.219:8080/home');
});
app.post('/reply',function(req,res){
  res.sendFile('reply.html',{root: __dirname});

  //function func(){
  //res.redirect('/home');}
  //setTimeout(func(),50000;  
  
});


app.get('/menejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('men',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/womenejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('women',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/haircareejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('haircare',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/skincareejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('skincare',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/makeupejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('makeups',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/mainejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('main',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/fashionshowejs',function(req,res){

var blogs={};
connection.query('SELECT * FROM blogs', function(err,results,fields){
    var l=results.length;
    blogs = results;
    
    

res.render('fashionshows',{blogs:blogs});

console.log(blogs);
 res.end();
});
});
app.get('/login',function(req,res){
res.sendFile('login.html',{root:__dirname});

});
app.get('/signup',function(req,res){
res.sendFile('signup.html',{root:__dirname});

});
app.get('/contact',function(req,res){
res.sendFile('contact.html',{root:__dirname});
});
var fs = require("fs");

app.get('/content',function(req,res){
res.sendFile('content.html',{root:__dirname});
});
app.post('/write',function(req,res){
var title=req.body.title;
var author=req.body.auth;
var blog = `${new Date().getTime()}.html`;
var cate = req.body.categories;
var cont = req.body.ta;
var writeStream = fs.createWriteStream(blog).on('error', function (err) {
 
    console.log(err);
 
});
var str = "<!DOCTYPE html><html lang='en' dir='ltr'><head><meta charset='utf-8'><link rel='stylesheet' href='style.css'><title></title></head><body><h1 id='heading1' style='word-spacing:20px;'>M A U V E</h1><h6 id='heading2'>A fashion hub!</h6><div class='topnav' ><a class='active' href='/home'>Home</a><div class='dropdown'><button class='dropbtn'>Categories</button><div class='dropdown-content'><a href='menejs'>Men</a><a href='womenejs'>Women</a><a href='/fashionshowejs'>Fashion Shows</a><a href='/makeupejs'>Makeups</a><a href='/skincareejs'>Skincare</a><a href='/haircareejs'>Haircare</a></div></div><a class='active' href='/contact'>Contact</a><a class='active' href='/about'>About</a><a class='active' href='/log'>LogIn</a><a class='active' href='/log>SignUp</a><a class='active' href='/content'>Write</a> </div> "
//writeStream.write(str);
//writeStream.write(cont);
writeStream.write(str+cont+"<FOOter ><h2 id='fhead'>Be Yourself</h2><h4>Everyone else is taken</h4><h5>Follow us on</h5><a href='www.fb.com'><img src='fb.png' width='20px' height='20px' alt=''></a></FOOter>");

writeStream.end();

var sql="insert into blogs values(?,?,?,?)"
  console.log(req.body);
  connection.query(sql,[author,title,blog,cate]);
  res.redirect('http://35.165.20.219:8080/home');
res.redirect('/mainejs');
res.end();
});

app.post('/open',function(req,res){
var filename = req.body.filename;
res.sendFile(filename,{root:__dirname});
});


















//-----------------------------------------------------------------------------------------------------------
// app.get('/home',function(req,resp){
//   connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password], function(err,results,fields){

//   if(results.length>0 && req.cookies.username){
//     resp.redirect('index1.html')
//   }
//   else{
//     resp.sendFile('signin.html',{root: __dirname})
//   }}

// );
app.post('/auth',function(req,res){
  var username= req.body.uname;
  var password = req.body.pass;
  if(username && password){
    connection.query('SELECT * FROM users WHERE uname = ? AND pass = ?',[username,password], function(err,results,fields){
    var l=results.length;
      if(l>0){
        
        res.redirect('http://35.165.20.219:3000/home');
      }else{
        res.send('Incorrect Username and/or Password!');
      }
      res.end();
    });
  }else{
    res.send('Please enter Username and/or Password!');
    res.end();
  }
});
// app.get('/login',function(req,res){
//   res.render('login/index',{'message' :req.flash('message')});
// });
// app.post("/login", passport.authenticate('local', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true
// }), function(req, res, info){
//   res.render('login/index',{'message' :req.flash('message')});
// });

// router.get('/',isAuthenticated,function(req,res,next){
//   if(req.isAuthenticated())
//   return next();
//   res.redirect('/login');
// })
app.listen(8080);