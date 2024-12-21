const Cluster = require("../models/cluster");

exports.createCluster = async(req, res) => {
    try {
        const { location, reports, reportCount, aggregatedSeverity, isValid } = req.body;

        const newCluster = new Cluster({
            location,
            reports,
            reportCount,
            aggregatedSeverity,
            isValid
        });

        const savedCluster = await newCluster.save();
        res.status(201).json({
            message: "Cluster created successfully",
            cluster: savedCluster,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating cluster",
            error: error.message,
        });
    }
};

exports.getClusters = async(req, res) => {
    try {
        const clusters = await Cluster.find();
        res.status(200).json(clusters);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching clusters",
            error: error.message,
        });
    }
};

exports.getClusterById = async(req, res) => {
    const { id } = req.params;

    try {
        const cluster = await Cluster.findById(id);
        if (!cluster) {
            return res.status(404).json({ message: "Cluster not found" });
        }
        res.status(200).json(cluster);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching cluster",
            error: error.message,
        });
    }
};

exports.updateCluster = async(req, res) => {
    const { id } = req.params;
    const { location, reports, reportCount, aggregatedSeverity, isValid } = req.body;

    try {
        const updatedCluster = await Cluster.findByIdAndUpdate(
            id, { location, reports, reportCount, aggregatedSeverity, isValid }, { new: true }
        );

        if (!updatedCluster) {
            return res.status(404).json({ message: "Cluster not found" });
        }

        res.status(200).json({
            message: "Cluster updated successfully",
            cluster: updatedCluster,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating cluster",
            error: error.message,
        });
    }
};

exports.deleteCluster = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedCluster = await Cluster.findByIdAndDelete(id);

        if (!deletedCluster) {
            return res.status(404).json({ message: "Cluster not found" });
        }

        res.status(200).json({ message: "Cluster deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting cluster",
            error: error.message,
        });
    }
};