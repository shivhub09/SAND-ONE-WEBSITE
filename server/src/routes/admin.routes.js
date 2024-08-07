const { Router } = require("express");
const router = Router();
const upload = require("../middlewares/multer.middleware");
const adminController = require('../controllers/admins.controller');

    
router.route("/createNestedForm").post(adminController.createNestedForm);

// create new client 
router.route("/createNewClient").post(
    upload.fields([
        {
            name:"clientPhoto",
            maxCount:1
        }
    ])
    ,adminController.createNewClient);

// fetchClient
router.route("/fetchClient").post(adminController.fetchClient);

// fetch all client 
router.route("/fetchAllClient").get(adminController.fetchAllClients);


// fetch all client specific campaigns
router.route("/fetchAllCampaigns").post(adminController.fetchAllClientSpecificCampaigns);

// fetch last 4 campaigns
router.route("/fetchLastCampaigns").get(adminController.fetchAllCampaigns);


// fetch campaign details
router.route("/fetchCampaignDetails").post(adminController.fetchCampaignDetails);


// create new campaign
router.route("/createNewCampaign").post(
    upload.fields([
        {
            name:"campaignPhoto",
            maxCount:1
        }
    ]),
    adminController.createNewCampaign);


// create new form
router.route("/createNewForm").post(adminController.createNewForm)

// assignCreatedForm
router.route("/assignCreatedForms").post(adminController.assignCreatedForm);


// update user rights
router.route("/updateUserRights").post(adminController.updateUserRights);

// fetch User Rights
router.route("/fetchUserRight").post(adminController.fetchUserRights);

// fetch data from the form 
router.route("/fetchDataFromCollection").post(adminController.fetchData)

// fetch number of clients and campaigns
router.route("/fetchNumberOfClientsAndCampaigns").get(adminController.fetchNumberOfClientsAndCampaigns);

// fetch forms
router.route("/fetchFormsForGivenClient").post(adminController.fetchFormsForCampaigns);

module.exports = router;