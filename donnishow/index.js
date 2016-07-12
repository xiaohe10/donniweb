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
    console.log(username,password);
    if(username=="doctor" && password=="donni"){
        res.redirect('/list');
    }else{
        res.redirect('/?message=用户名或密码错误');
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
    MongoClient.connect("mongodb://remote:hengaigaoke@hengaigaoke.com:27017/violet", function(err, db) {
        if(!err) {
            console.log("We are connected");
        }

        var User = db.collection('users');
        User.findOne({'id':username },function(err,user){
            if(err){
                console.log("err");
            }
            else{
                console.log(user);
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
                    groupid = 0;
                    res.render('patient',{'groups':groups,'usernews':usernews,'user':user,'groupid':groupid});
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

                        for(var k = 0; k < emotiongraphs.length;k++){
                            anxiety_trend.push(emotiongraphs[k].anxiety);
                            disgust_trend.push(emotiongraphs[k].disgust);
                            sorrow_trend.push(emotiongraphs[k].sorrow);
                            surprise_trend.push(emotiongraphs[k].surprise);
                            anger_trend.push(emotiongraphs[k].anger);
                            fear_trend.push(emotiongraphs[k].fear);
                            depress_trend.push(emotiongraphs[k].depress);
                            tired_trend.push(emotiongraphs[k].tired);
                        }
                        var heart_mistakes = [];
                        var groupecg = groups[groupid-1].ecg;
                        for(var t =0 ; t < groupecg.length;t++){
                            var mis = groupecg[t].ecgDiagnosis;
                            mis = JSON.parse(mis);
                            heart_mistakes.push({ecgDiagnosis:mis.ecgDiagnosis,time:mis.date})
                        }
                        bingtudata = [currEmo.joy,currEmo.clam,currEmo.fear,currEmo.disgust,currEmo.anger,currEmo.surprise,currEmo.sorrow];
                        res.render('patient',{'anxiety_trend':anxiety_trend,
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

});

app.all('/list', function (req, res) {
    res.render('list');
});
app.get('/logout', function (req, res) {
    res.redirect('/')
});
app.get('/removePatient',function(req,res){
    res.redirect('/list');
})
app.use('/static',express.static('static'));

app.set('view engine', 'ejs');
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

