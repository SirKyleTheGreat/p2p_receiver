const { PeerServer } = require("peer");
const SERVERKEY = "AWDSJILK";

const peerServer = PeerServer({
  port: 9000,
  path: "/",
  key: SERVERKEY,
  allow_discovery: true,
  ti,
});
