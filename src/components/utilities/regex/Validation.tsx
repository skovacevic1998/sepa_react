export const isEmailValid = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

export const isUsernameValid = (value: string) => {
  const regex = /^[a-zA-Z0-9_-]{4,16}$/;
  return regex.test(value);
};

export const isPasswordValid = (value: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(value);
};

export const kontrolniBrojRegex = /^\d{2}$/;
