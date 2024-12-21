const express = require("express");
const router = express.Router();
const {
    createCluster,
    getClusterById,
    getClusters,
    updateCluster,
    deleteCluster,
} = require("../controllers/cluster");

router.post("/clusters", createCluster);
router.get("/clusters", getClusters);
router.get("/clusters/:id", getClusterById);
router.put("/clusters/:id", updateCluster);
router.delete("/clusters/:id", deleteCluster);

module.exports = router;