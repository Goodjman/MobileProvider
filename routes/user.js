
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var mail= post.email;
      var pass= post.pswrd;
      var fname= post.FirstName;
      var lname= post.Surname;
      var mob= post.MobileNumber;
      var otec=post.Patronymic;
      var bdate=post.BirthDate;
      var passports=post.PassportSeries;
      var passportn = post.PassportNumber;
      var author=post.Authority;
      var issdate =post.IssueDate;
      var hometown=post.Address;
      var tariff=post.Tarif;

      var sql = 
      `INSERT INTO accounts (email, pswrd) VALUES ('${mail}', MD5('${pass}'));
       INSERT INTO Abonents(Surname,FirstName,Patronymic,BirthDate,PassportSeries,PassportNumber,Authority,IssueDate,Address) 
       VALUES ("${lname}","${fname}","${otec}","${bdate}","${passports}","${passportn}","${author}","${issdate}","${hometown}");
       INSERT INTO contracts(MobileNumber,AbonentID, DealDate ,Tarif,AccountID) 
       VALUES("+37566${mob}",LAST_INSERT_ID(),"2000-05-12","${tariff}",LAST_INSERT_ID());
       `/*move last insert into contracts in the admin page, where he can easily check exists number or not*/ 
      var query = db.query(sql, function(err, result) {
         if(err){
            console.log(err);
            return (res.status(500).json());
          };
         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var mail= post.email;
      var pass= post.pswrd;

      var sql=`SELECT AccountID,email, pswrd FROM Accounts WHERE email='${mail}' and pswrd = MD5('${pass}');`;                           
      db.query(sql, function(err, results){   
         if(err){
            console.log(err);
            console.log("loginpageerror");
            return (res.status(500).json());
          };
         if(results.length){
            req.session.userId = results[0].AccountID;
            req.session.user = results[0];
            console.log(results[0].AccountID);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM Accounts WHERE AccountID='"+userId+"'";

   db.query(sql, function(err, results){
      if(err){
         console.log(err);
         return (res.status(500).json());
       };
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      if(err){
         console.log(err);
         return (res.status(500).json());
       };
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM Accounts WHERE AccountID='"+userId+"'";          
   db.query(sql, function(err, result){  
      if(err){
         console.log(err);
         return (res.status(500).json());
       };
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM Accounts WHERE AccountID='"+userId+"'";
   db.query(sql, function(err, results){
      if(err){
         console.log(err);
         return (res.status(500).json());
       };
      res.render('edit_profile.ejs',{data:results});
   });
};
