





































/*Randomizer SQL*/
 /*   function  insertinto(){
        var count=0;
        var caller=662416070;
        var reciever=332200202;
        var day = 22;
        var hour = 16;
        var minute = 30;
        var second = 15;
        var timer=10;
        var string;
        var bigstring=[];
        id=1;
        //Insert into Calls values (30,"+375333617656","+375293714567","2020-04-12 12:47:45",120);
        while (count<601){
            string =` (${id},"+375${caller}","+375${reciever}","2020-04-${day} ${hour}:${minute}:${second}",${timer}), `
            bigstring+=string;
            count++;
            caller+=11111;
            reciever+=40020;
            timer>150?timer=5:timer+=4;
            second>54?(second=11,minute+=1):second+=4;
            minute>52?(minute=12,hour+=1):minute+=5;
            hour>22?(hour=10,day+=1):hour;
        }
        console.log(bigstring);
    }
    insertinto();
*/