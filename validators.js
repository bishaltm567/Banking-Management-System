const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validateAccountNumber = (accountNumber) => {
  return /^[0-9]{12}$/.test(accountNumber);
};

const validateAmount = (amount) => {
  return !isNaN(amount) && amount > 0;
};

const validatePassword = (password) => {
  return password.length >= 8;
};

module.exports = {
  validateEmail,
  validatePhoneNumber,
  validateAccountNumber,
  validateAmount,
  validatePassword
};
