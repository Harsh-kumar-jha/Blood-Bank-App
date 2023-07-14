const testController = (req, res) => {
  res.status(200).json({
    message: "test route",
    success: "true",
  });
};

module.exports = testController;
