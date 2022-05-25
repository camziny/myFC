class PlayerSerializer {
  static async getSummary(player) {
    const allowedAttributes = ["id"];
    let serializedPlayer = {};
    for (const attribute of allowedAttributes) {
      serializedPlayer[attribute] = player[attribute];
    }
    return serializedPlayer;
  }
}

export default PlayerSerializer;
