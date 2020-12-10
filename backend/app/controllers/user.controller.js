//renvoie l'acces aux contenus
exports.userBoard = (req, res) => {
  res.status(200).send({
    message: "You have acces to user content."
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send({
    message: "You have acces to admin content."
  });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send({
    message: "You have acces to moderator content."
  });
};