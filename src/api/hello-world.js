export default function handler(req, res) {
  console.log("oh hi")
  res.status(200).json({ hello: `world` })
}
