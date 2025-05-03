function isValidUrl(url) {
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-]*)*(\?.*)?(#.*)?$/;
    return regex.test(url);
  }
  
  module.exports = isValidUrl;
  