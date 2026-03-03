export type LoginPayload = {
  mobile_no: string;
  password: string;
};

export type RegisterPayload = {
  mobile_no: string;
  name: string;
  password: string;
};

export const UserLogin = async (requestData: LoginPayload) => {
  try {
    const response = await fetch("http://192.168.68.102:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      // Show error message
      console.log("Login failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

export const UserRegister = async (requestData: RegisterPayload) => {
  try {
    const response = await fetch("http://192.168.68.102:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful Register
      return data.message;
    } else {
      // Show error message
      console.log("Login failed with error : ", data.message);
      return data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export const ValidateAccessToken = () => {};
