/**
 * Created by Administrator on 7/4/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// var User = require('./models').User;
//
// var UserNews = require('./models').UserNews;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
MongoClient.connect("mongodb://remote:hengaigaoke@hengaigaoke.com:27017/violet", function(err, database) {
    if (err) {
        console.log("database connect problem");
    }
    db = database;
    console.log('database connected');
});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.get('/', function (req, res) {
    message=req.query.message;
    res.render('index',{message:message});
});
app.post('/login',function(req,res){
    username = req.body.username;
    password = req.body.password;
    console.log("user login:"+username);
    if(username=='admin'){
        if(password=="donni"){
            res.redirect('/admin/doctorlist');
        }else{
            res.redirect('/?message=用户名或密码错误');
        }

    }else{
        var Doctorinfo = db.collection('doctorinfo');
        Doctorinfo.findOne({phone:username,password:password},function(err,doctorinfo){
            if(doctorinfo){
                res.redirect('/list?doctorID='+username);
            }else{
                res.redirect('/?message=用户名或密码错误');
            }
        })
    }

});
function timeformat(time){
    hour = time.getHours();
    if(hour<10){
        hour = '0'+hour;
    }
    minute = time.getMinutes();
    if(minute<10){
        minute = '0'+minute;

    }
    str = (time.getMonth()+1)+"月"+time.getDate()+"日  "+hour+":"+minute;
    return str;
}
app.get('/patient', function (req, res) {
    username = req.query.username;
    groupid  = req.query.groupid;
    doctorID=req.query.doctorID;
    var User = db.collection('users');
    User.findOne({'id':username },function(err,user){
        if(err){
            console.log("err");
        }
        else{
            console.log("patient:"+user.username);
        }
        var Usernews = db.collection('usernews');
        var options = {
            'limit':100
        }
        Usernews.find({'userID':new ObjectID(user._id)},options).sort({'_id':-1}).toArray(function(err,usernews){
            var groups = [];
            var groupStartIndex = 0;
            var groupEndIndex = 0;
            var endtime = null;
            var pretime = null;
            var emotiongraphs = [];

            for(var i =0; i < usernews.length;i++){
                usernew = usernews[i];
                if(pretime == null){
                    pretime =  usernew.pending_date;
                    endtime = usernew.pending_date;
                    currentemotiongraph = {}
                    currentemotiongraph['anxiety'] = usernew.anxiety;
                    currentemotiongraph['depress'] = usernew.depress;
                    currentemotiongraph['tired'] = usernew.tired;
                    var currEmo = JSON.parse(usernew.allEmotions);
                    currentemotiongraph['disgust'] = currEmo.disgust;
                    currentemotiongraph['sorrow'] = currEmo.sorrow;
                    currentemotiongraph['surprise'] = currEmo.surprise;
                    currentemotiongraph['anger'] = currEmo.anger;
                    currentemotiongraph['fear'] = currEmo.fear;

                    emotiongraphs.push(currentemotiongraph);
                }else{
                    if((pretime-usernew.pending_date)<=600*1000){ // 如果小于10分钟认为是一次
                        pretime = usernew.pending_date;
                        groupStartIndex ++;
                        currentemotiongraph = {}
                        currentemotiongraph['anxiety'] = usernew.anxiety;
                        currentemotiongraph['depress'] = usernew.depress;
                        currentemotiongraph['tired'] = usernew.tired;
                        var currEmo = JSON.parse(usernew.allEmotions);
                        currentemotiongraph['disgust'] = currEmo.disgust;
                        currentemotiongraph['sorrow'] = currEmo.sorrow;
                        currentemotiongraph['surprise'] = currEmo.surprise;
                        currentemotiongraph['anger'] = currEmo.anger;
                        currentemotiongraph['fear'] = currEmo.fear;
                        emotiongraphs.push(currentemotiongraph);
                    }else{
                        var newarray  = emotiongraphs.slice();
                        if(newarray.length>25){
                            newarray = newarray.slice(newarray.length-25,newarray.length);
                        }
                        emotiongraphs = [];
                        groups.push({"emotiongraphs":newarray,"start":groupStartIndex,'end':groupEndIndex,'starttime':timeformat(pretime),'endtime':timeformat(endtime),'lefttime':pretime,'rightime':endtime});
                        pretime = usernew.pending_date;
                        groupStartIndex ++;
                        groupEndIndex = groupStartIndex;
                        endtime = pretime;
                    }
                }

                // console.log(usernew.pending_date);
            }
            if(groupStartIndex != groupEndIndex ){
                var newarray  = emotiongraphs.slice();
                if(newarray.length>25){
                    newarray = newarray.slice(newarray.length-25,newarray.length);
                }

                emotiongraphs= [];
                groups.push({"emotiongraphs":newarray,"start":groupStartIndex,'end':groupEndIndex,'starttime':timeformat(pretime),'endtime':timeformat(endtime),'lefttime':pretime,'rightime':endtime});
            }
            groups = groups.slice(0,5).reverse();
            // console.log(groups);
            for(var i = 0; i < groups.length;i++){
                var group = groups[i];
                group.ecg = [];
                // console.log(group.starttime,'-',group.endtime);
            }
            if(groups.length==0){
               res.render('patient-new',{message:'没有数据',doctorID:doctorID,'user':user,'gad7':0,'phq9':0,patientName:user.username});
            }else{
                ecgstarttime = groups[0].lefttime;
                ecgendtime = groups[groups.length-1].rightime;
                // console.log('ecgstarttime:',ecgstarttime,'ecgendtime:',ecgendtime);
                var Ecg = db.collection('ecgs');
                Ecg.find({"date":{$gt: ecgstarttime, $lt: ecgendtime}}).sort({'_id':-1}).toArray(function(err,ecgs){
                    for(var i =0; i < ecgs.length;i++){
                        // console.log(user.nickname,' 心电异常 ',i, ecgs[i].ecgDiagnosis,ecgs[i].date,ecgs[i].ecg);
                        for(var j =0; j < groups.length;j ++){
                            if(ecgs[i].date<= groups[j].rightime && ecgs[i].date >= groups[j].lefttime){
                                groups[j].ecg.push(ecgs[i]);
                                break;
                            }
                        }

                    }
                    if(groupid==undefined){
                        groupid = groups.length;
                    }
                    if(groupid<=0 || groupid>groups.length){
                        groupid = groups.length;
                    }
                    usernew = usernews[groups[groupid-1].end];

                    var currEmo = JSON.parse(usernew.allEmotions);
                    emotiongraphs = groups[groupid-1].emotiongraphs;
                    var anxiety_trend = [];
                    var disgust_trend = [];
                    var sorrow_trend = [];
                    var surprise_trend = [];
                    var anger_trend = [];
                    var fear_trend = [];
                    var depress_trend = [];
                    var tired_trend=[];
                    var EmoSum = currEmo.joy+currEmo.clam+currEmo.fear+currEmo.disgust+currEmo.anger+currEmo.surprise+currEmo.sorrow;
                    if(EmoSum == 0){
                        EmoSum = 1;
                    }
                    for(var k = 0; k < emotiongraphs.length;k++){
                        anxiety_trend.push(emotiongraphs[k].anxiety);
                        disgust_trend.push(emotiongraphs[k].disgust);
                        sorrow_trend.push(emotiongraphs[k].sorrow/EmoSum*100);
                        surprise_trend.push(emotiongraphs[k].surprise/EmoSum*100);
                        anger_trend.push(emotiongraphs[k].anger/EmoSum*100);
                        fear_trend.push(emotiongraphs[k].fear/EmoSum*100);
                        depress_trend.push(emotiongraphs[k].depress);
                        tired_trend.push(emotiongraphs[k].tired/EmoSum*100);
                    }
                    var heart_mistakes = [];
                    var groupecg = groups[groupid-1].ecg;
                    for(var t =0 ; t < groupecg.length;t++){
                        var mis = groupecg[t].ecgDiagnosis;
                        mis = JSON.parse(mis);
                        heart_mistakes.push({ecgDiagnosis:mis.ecgDiagnosis,time:timeformat(groupecg[t].date)})
                    }
                    bingtudata = [currEmo.joy,currEmo.clam,currEmo.fear,currEmo.disgust,currEmo.anger,currEmo.surprise,currEmo.sorrow];
                    res.render('patient-new',{message:false,doctorID:doctorID,'anxiety_trend':anxiety_trend,
                        "sorrow_trend":sorrow_trend,
                        surprise_trend:surprise_trend,
                        anger_trend:anger_trend,
                        fear_trend:fear_trend,
                        depress_trend:depress_trend,
                        "tired_trend":tired_trend,
                        disgust_trend:disgust_trend,heart_mistakes:heart_mistakes,'groups':groups,'bingtudata':bingtudata,'curr_group':groups[groupid-1],'usernews':usernews,'user':user,'username':username,'groupid':groupid});
                });
            }
        });
    })

});
app.get('/test/gad7',function (req, res) {
    doctorID=req.query.doctorID;
    patientID=req.query.patientID;
    patientName=req.query.patientName;
    res.render('test_gad7',{doctorID:doctorID,patientID:patientID,patientName:patientName,message:null})
});
app.post('/test/gad7/submit',function (req, res) {
    doctorID=req.body.doctorID;
    patientID=req.body.patientID;
    var answer = [];
    answer[1] = req.body.q1;
    answer[2] = req.body.q2;
    answer[3] = req.body.q3;
    answer[4] = req.body.q4;
    answer[5] = req.body.q5;
    answer[6] = req.body.q6;
    answer[7] = req.body.q7;

    finalanswer = 0;
    for(var i =1; i < 8; i++){
        finalanswer += parseInt(answer[i]);
    }
    var User = db.collection('users');
    User.update({'id':patientID},{$set:{'gad7':finalanswer}},{upsert:true, multi: true},function(err,result){
        res.redirect("/patient?username="+patientID+"&doctorID="+doctorID);
    })

});
app.all('/list', function (req, res) {
    message=req.query.message;
    doctorID=req.query.doctorID;

    var Doctor = db.collection('doctors');
    console.log('doctor '+doctorID+ ' list');
    Doctor.find({'doctorID':doctorID }).toArray(function(err,patients){
        res.render('list',{message:message,patients:patients,doctorID:doctorID})
    })
});
app.post('/adduser',function(req,res){
    username = req.body.username;
    doctorID = req.body.doctorID;
    console.log("add user: "+username,doctorID);
    var User = db.collection('users');
    User.findOne({'id':username },function(err,user) {
        if (err) {
            console.log("err");
        }
        if(!user){
            res.redirect('/list?message=用户不存在&doctorID='+doctorID);
        }
        else {
            var Doctor = db.collection('doctors');
            Doctor.insert({
                'doctorID':doctorID,
                'patientID':user.id,
                'patientName':user.username,
                'birthday':user.birthday
            })
            res.redirect('/list?message=用户添加成功&doctorID='+doctorID);
            console.log("patient:" + user.username);
        }
    });

});
app.get('/logout', function (req, res) {
    res.redirect('/')
});
app.get('/removePatient',function(req,res){
    username=req.query.username;
    doctorID = req.query.doctorID;
    var Doctor = db.collection('doctors');
    console.log('delete patient',username,' by', doctorID)
    Doctor.deleteOne({'doctorID':doctorID,'patientID':username },function(err,results){
        res.redirect('/list?doctorID='+doctorID);
    })

})
app.use('/static',express.static('static'));

app.post('/modifyUser',function(req,res){
    userID = req.body.userID;
    username = req.body.realname;
    birthday = req.body.birthday;
    doctorID= req.body.doctorID;
    console.log("update user: "+username+" "+userID+" "+birthday);
    var User = db.collection('users');

    User.update({id:userID },{$set:{"username":username,"birthday":birthday}},{
            upsert:true,
        multi: true},function (err,result) {
        if(err){
            console.log(err);
        }else{
            var Doctor = db.collection('doctors');
            Doctor.update({patientID:userID,doctorID:doctorID},{$set:{"patientName":username,"birthday":birthday}},function(err,result1){
                res.redirect('/list?message=用户修改成功&doctorID='+doctorID);
            })
        }

    });
})
app.post('/admin/modifydoctor',function(req,res){
    phone = req.body.phone;
    hospital = req.body.hospital;
    name = req.body.name;
    password = req.body.password;
    console.log("update doctor: "+phone+" "+hospital+" "+name+" "+password);
    var Doctorinfo = db.collection('doctorinfo');
    Doctorinfo.update({phone:phone},{$set:{hospital:hospital,name:name,password:password}},function(err,result){
        if(err){
            res.redirect('/admin/doctorlist?message=医生修改失败');
        }else{
            res.redirect('/admin/doctorlist?message=医生修改成功');
        }
    })
})

app.get('/admin/doctorlist',function(req,res){
    //doctorinfo = db.collection('doctorinfo');
    message=req.query.message;
    var Doctorinfo = db.collection('doctorinfo');
    Doctorinfo.find().toArray(function(err,doctors){
        res.render('admin',{message:message,doctors:doctors})
    });
});

app.post('/admin/adddoctor',function(req,res){
    hospital = req.body.hospital;
    name = req.body.name;
    phone = req.body.phone;
    password = req.body.password;
    //doctorinfo = db.collection('doctorinfo');
    var Doctorinfo = db.collection('doctorinfo');
    Doctorinfo.insert({
        phone:phone,
        hospital:hospital,
        name:name,
        password:password
    })
    res.redirect('/admin/doctorlist?message=添加成功');


});

app.get('/admin/deletedoctor',function(req,res){
    phone = req.query.phone;
    //doctorinfo = db.collection('doctorinfo');
    var Doctorinfo = db.collection('doctorinfo');
    Doctorinfo.deleteOne({'phone':phone},function(err,results){
        res.redirect('/admin/doctorlist?message=删除成功');
    })

});
app.set('view engine', 'ejs');
app.listen(3002, function () {
    console.log('donni web listening on port 3002!');
});

