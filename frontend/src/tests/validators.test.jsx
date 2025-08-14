// src/__tests__/validators.test.js
import { isValidAadhaar, isValidPAN } from '../utils/validators.jsx';

describe('Validators', () => {
    test('valid Aadhaar numbers pass', () => {
        expect(isValidAadhaar('123456789012')).toBe(true);
    });

    test('invalid Aadhaar numbers fail', () => {
        expect(isValidAadhaar('123')).toBe(false);
        expect(isValidAadhaar('abcdefghijk')).toBe(false);
    });

    test('valid PAN numbers pass', () => {
        expect(isValidPAN('ABCDE1234F')).toBe(true);
    });

    test('invalid PAN numbers fail', () => {
        expect(isValidPAN('abcde1234f')).toBe(false); // lowercase
        expect(isValidPAN('1234567890')).toBe(false);
    });
});

