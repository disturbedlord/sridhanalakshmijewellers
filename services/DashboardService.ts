export async function GetAllSchemes(accessToken: string | undefined) {
  if (!accessToken) return undefined;
  try {
    const response = await fetch("http://192.168.68.102:5000/schemes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Successful Register
      return data;
    } else {
      // Show error message
      console.log("Schemes Fetch failed with error : ", data.message);
      return data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
}
