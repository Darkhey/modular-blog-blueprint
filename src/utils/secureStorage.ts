// Secure storage utility to replace localStorage for sensitive data
const STORAGE_PREFIX = 'energyapp_';
const ENCRYPTION_KEY = 'user_session_data';

// Simple encryption/decryption for client-side data
const encrypt = (data: string): string => {
  // Simple XOR encryption for demo - in production use proper encryption
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return btoa(result);
};

const decrypt = (encryptedData: string): string => {
  try {
    const data = atob(encryptedData);
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return result;
  } catch {
    return '';
  }
};

export const secureStorage = {
  setItem: (key: string, value: string, expirationMinutes: number = 60) => {
    const expirationTime = Date.now() + (expirationMinutes * 60 * 1000);
    const dataWithExpiration = JSON.stringify({
      value,
      expiration: expirationTime
    });
    
    const encryptedData = encrypt(dataWithExpiration);
    sessionStorage.setItem(STORAGE_PREFIX + key, encryptedData);
  },

  getItem: (key: string): string | null => {
    const encryptedData = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (!encryptedData) return null;

    const decryptedData = decrypt(encryptedData);
    if (!decryptedData) return null;

    try {
      const { value, expiration } = JSON.parse(decryptedData);
      
      if (Date.now() > expiration) {
        secureStorage.removeItem(key);
        return null;
      }
      
      return value;
    } catch {
      secureStorage.removeItem(key);
      return null;
    }
  },

  removeItem: (key: string) => {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
  },

  clear: () => {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    });
  }
};