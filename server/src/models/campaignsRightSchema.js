const mongoose = require("mongoose");
const Schema = mongoose;

const campaignRights = new Schema({
    campaignId:{
        type:Schema.Types.ObjectId,
        ref:"Campaign",
    },
    clientId:{
        type:Schema.Types.ObjectId,
        ref:"Client",
    },
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    viewData:{
        type:Boolean,
        default:false,
        required:true
    },
    downloadData:{
        type:Boolean,
        default:false,
        required:true
    },
    manipulateData:{
        type:Boolean,
        default:false,
        required:true
    },
    downloadReport:{
        type:Boolean,
        default:false,
        required:true
    }
});

export const rights = mongoose.model("CampaignRights", campaignRights)