export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isUsernameValid = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/;
  return usernameRegex.test(username);
};

export const isPasswordValid = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};
