export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "StackGSB Studio Vercel API is working",
    });
  }

  if (req.method === "POST") {
    return res.status(200).json({
      success: true,
      message: "Form request received succesfully",
      data: req.body,
    });
  }
  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
