// services/userService.js
export const findUser = async ({ username, email, password }) => {
    const formData = new URLSearchParams();
    formData.append("userName", username);
    formData.append("email", email);
    formData.append("password", password);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
  
      if (response.ok) {
        return await response.json(); // Return the parsed response
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage); // Throw an error for non-200 responses
      }
    } catch (error) {
      throw new Error("An error occurred while finding the user: " + error.message);
    }
  };
  