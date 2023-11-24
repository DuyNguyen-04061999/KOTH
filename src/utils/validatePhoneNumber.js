export const validatePhoneNumber = (phone) => {
    // Define the regex pattern
    const pattern = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

    // Use test method to check if the phone number matches the pattern
    return pattern.test(phone);
  };
  