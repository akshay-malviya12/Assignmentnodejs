const generateRandomcodeforotp = () => {
  return Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000;
};

module.exports = { generateRandomcodeforotp };
