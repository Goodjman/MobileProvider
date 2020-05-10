
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      let today = new Date().toISOString().slice(0, 10);
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

     /* var sql = 
      `INSERT INTO accounts (email, pswrd) VALUES ('${mail}', MD5('${pass}'));
       INSERT INTO Abonents(Surname,FirstName,Patronymic,BirthDate,PassportSeries,PassportNumber,Authority,IssueDate,Address) 
       VALUES ("${lname}","${fname}","${otec}","${bdate}","${passports}","${passportn}","${author}","${issdate}","${hometown}");
       INSERT INTO contracts(MobileNumber,AbonentID, DealDate ,Tarif,AccountID) 
       VALUES("+37566${mob}",LAST_INSERT_ID(),"2000-05-12","${tariff}",LAST_INSERT_ID());
       ` */
       /*move last insert into contracts in the admin page, where he can easily check exists number or not*/ 
      //var query = 
      //888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
      /*db.query(`SELECT AccountID from Accounts where email="${mail}"`, function(err, results){   
         if(results){
            message = "Account with this E-mail already exists";
            res.status(400).send('That user already exists!');
            res.render('signup.ejs', {message: message });
            
         };});
       db.query(`SELECT AccountID from Contracts where MobileNumber="+37566${mob}"`, function(err, results){   
         if(results){
            message = "Account with this mobile number already exists";
            res.status(400).send('That user already exists!');
            res.render('signup.ejs',{message: message});
           
         };});*/
      //888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
      db.query(`INSERT INTO accounts (email, pswrd) VALUES ('${mail}', MD5('${pass}'));`, function(err, results) {
         if(err){
            console.log(err);
            console.log("Something wrong with accounts table");
            message = "Account with this E-mail already exists";
            return res.status(400).send('That user already exists!');
            //res.render('signup.ejs', {message: message });
          };
        
      });
      req.session.userId = results[0].AccountID;
      userId=req.session.userId;

      db.query(`INSERT INTO Abonents(Surname,FirstName,Patronymic,BirthDate,PassportSeries,PassportNumber,Authority,IssueDate,Address) 
      VALUES ("${lname}","${fname}","${otec}","${bdate}","${passports}","${passportn}","${author}","${issdate}","${hometown}");`, function(err, results) {
         if(err){
            console.log(err);
            console.log("Something wrong with abonents table");
            message = "Incorrect Passport Data input";
            //db.query(`DELETE  FROM Accounts WHERE AccountID=LAST_INSERT_ID();`, function(err, results){});     
            //res.render('signup.ejs',{message: message});
          };
          
      });

      db.query(`INSERT INTO contracts(MobileNumber,AbonentID, DealDate ,Tarif,AccountID) 
      VALUES("+37566${mob}",LAST_INSERT_ID(),"${today}","${tariff}",LAST_INSERT_ID());
      ` , function(err, results) {
         if(err){
            console.log(err);
            console.log("Something wrong with contracts table");
           /* message = "Account with this mobile number already exists";
            db.query(`DELETE  FROM Accounts WHERE AccountID=LAST_INSERT_ID();`, function(err, results){if(err){console.log("cant delete in accounts")}}); 
            db.query(`DELETE  FROM Abonents WHERE AbonentID=LAST_INSERT_ID();`, function(err, results){if(err){console.log("cant delete in abonents")}}); 
            res.render('signup.ejs',{message: message});*/
            message = "Account with this mobile number already exists";
            return res.status(400).send('That user already exists!');
           // res.render('signup.ejs',{message: message});
          };
          message = "Succesfully! Your account has been created.";
          res.render('signup.ejs',{message: message});
      });
   /*   db.query(`INSERT INTO accounts (email, pswrd) VALUES ('${mail}', MD5('${pass}'));`)
      .then(result => database.query( `INSERT INTO Abonents(Surname,FirstName,Patronymic,BirthDate,PassportSeries,PassportNumber,Authority,IssueDate,Address) 
      VALUES ("${lname}","${fname}","${otec}","${bdate}","${passports}","${passportn}","${author}","${issdate}","${hometown}");` ))
      .then(result=>{message = "Succesfully! Your account has been created.";
      res.render('signup.ejs',{message: message})});
*/
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
          };
         if(results.length){
           req.session.userId = results[0].AccountID;
            req.session.user = results[0];
            console.log(results[0].AccountID);
            res.redirect("/home/dashboard");
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
           
exports.dashboard = function(req, res){
           //= function(req, res, next){
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('current id ='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   db.query(`SELECT * FROM Accounts WHERE AccountID=${userId};`, function(err, results){
      if(err){
         console.log(err);
         console.log("dashboard crashed")
       };
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      if(err){
         console.log(err);
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

   var sql=`SELECT Accounts.AccountID,Abonents.Surname,Abonents.FirstName FROM Accounts  JOIN Abonents on (Accounts.AccountID=Abonents.AbonentID) WHERE AccountID=${userId};`;          
   db.query(sql, function(err, results){  
      if(err){
         console.log(err);
       };
      
         req.session.user = results[0];
         console.log(results[0].Surname);
         
      res.render('profile.ejs',{user:results});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql=`SELECT * FROM Accounts WHERE AccountID=${userId};`;
   db.query(sql, function(err, results){
      if(err){
         console.log(err);
       };
      res.render('edit_profile.ejs',{data:results});
   });
};
