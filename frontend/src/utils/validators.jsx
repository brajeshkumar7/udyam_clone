// src/utils/validators.js
export const isValidAadhaar = (aadhaar) => /^[0-9]{12}$/.test(aadhaar);
export const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
