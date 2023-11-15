let userNFTChoice = {};

export function getuserNFTChoice(userId) {
  return userNFTChoice[userId];
}

export function setuserNFTChoice(userId, choice) {
  userNFTChoice[userId] = choice;
}
