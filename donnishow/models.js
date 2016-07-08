/**
 * Created by t-hexiao on 7/6/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
    /*
     * Basic User Properties (Private commonly)
     */
    id: { type: String, default: null },
    openid: { type: String, default: null },
    password: { type: String, default: null },
    token: { type: String, default: null },
    salt: { type: String, default: null },
    code: { type: String, default: null },

    /*
     * Basic User Properties (Public)
     */
    username: { type: String, default: null },
    gender: { type: Boolean, default: true },
    avatar: { type: String, default: null },
    backImage:{ type: String, default: null },
    birthday: { type: String, default: null },
    address: { type: String, default: null },
    bodyheight:{type:Number,default:170},
    bodyweight:{type:Number,default:70},
    signature: { type: String, default: null },

    nickname:{type:String,default:null},
    heart_trouble_history:{type:String,default:null},
    psychological_history:{type:String,default:null},

    /*
     * Related Model
     */
    device: { type: Schema.Types.ObjectId, ref: 'Device' },

    /*
     * Key Point Datetime
     */
    check_phone_date: { type: Date, default: null },
    register_date: { type: Date, default: null },
    change_passwd_date: { type: Date, default: null },
    last_login_date: { type: Date, default: null },
    verify_date: { type: Date, default: null }

});
var userNewsSchema = Schema({
    id:{type:String,default:null},
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    pending_date: { type: Date, default: null },
    measureState:{type:String,default:null},
    measuredTime:{type:Number,default:null},
    averageHeartbeat:{type:Number,default:null},
    unusualTime:{type:Number,default:null},
    heartRate:{type:Number,default:null},
    currentEmotion:{type:String,default:null},
    allEmotions:{type:String,default:null},
    anxiety:{type:Number,default:null},
    depress:{type:Number,default:null},
    tired:{type:Number,default:null}
});
/*
 * Export the User Model
 *
 * Should connect the mongodb firstly used.
 * !!! do not execute !!!
 */
mongoose.createConnection('mongodb://remote:hengaigaoke@hengaigaoke.com:27017/violet');
module.exports.User = mongoose.model('User', userSchema);
module.exports.UserNews = mongoose.model('UserNews', userNewsSchema);