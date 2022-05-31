class PlayerSerializer {
  static getSummary(player) {
    const allowedAttributes = ["id", "name"];
    let serializedPlayer = {};
    for (const attribute of allowedAttributes) {
      serializedPlayer[attribute] = player[attribute];
    }
    return serializedPlayer;
  }
}

export default PlayerSerializer;
