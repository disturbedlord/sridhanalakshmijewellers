export const GenericError = (res) => {
  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};
