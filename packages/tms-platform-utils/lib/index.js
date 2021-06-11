(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto-js'))
    : typeof define === 'function' && define.amd ? define(['exports', 'crypto-js'], factory)
      : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.platformFs = {}, global.CryptoJS));
}(this, ((exports, CryptoJS) => {
  function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  const CryptoJS__default = /* #__PURE__ */_interopDefaultLegacy(CryptoJS);

  const key = CryptoJS__default.default.enc.Utf8.parse('i1hphkeZi3KDJk3t'); // 十六位十六进制数作为密钥
  const iv = CryptoJS__default.default.enc.Utf8.parse('iqJ407bhirTtDToL'); // 十六位十六进制数作为密钥偏移量
  // 加密方法
  function Encrypt(word) {
    if (word === void 0) { word = ''; }
    const srcs = CryptoJS__default.default.enc.Utf8.parse(word);
    const encrypted = CryptoJS__default.default.AES.encrypt(srcs, key, { iv, mode: CryptoJS__default.default.mode.CBC, padding: CryptoJS__default.default.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }
  // 解密方法
  function Decrypt(word) {
    if (word === void 0) { word = ''; }
    const encryptedHexStr = CryptoJS__default.default.enc.Hex.parse(word);
    const srcs = CryptoJS__default.default.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS__default.default.AES.decrypt(srcs, key, { iv, mode: CryptoJS__default.default.mode.CBC, padding: CryptoJS__default.default.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(CryptoJS__default.default.enc.Utf8);
    return decryptedStr.toString();
  }

  exports.Decrypt = Decrypt;
  exports.Encrypt = Encrypt;

  Object.defineProperty(exports, '__esModule', { value: true });
})));
