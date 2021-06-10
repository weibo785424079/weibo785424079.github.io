(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'crypto-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.platformFs = {}, global.CryptoJS));
}(this, (function (exports, CryptoJS) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);

    var key = CryptoJS__default['default'].enc.Utf8.parse("i1hphkeZi3KDJk3t"); //十六位十六进制数作为密钥
    var iv = CryptoJS__default['default'].enc.Utf8.parse('iqJ407bhirTtDToL'); //十六位十六进制数作为密钥偏移量
    //加密方法
    function Encrypt(word) {
        if (word === void 0) { word = ''; }
        var srcs = CryptoJS__default['default'].enc.Utf8.parse(word);
        var encrypted = CryptoJS__default['default'].AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS__default['default'].mode.CBC, padding: CryptoJS__default['default'].pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    //解密方法
    function Decrypt(word) {
        if (word === void 0) { word = ''; }
        var encryptedHexStr = CryptoJS__default['default'].enc.Hex.parse(word);
        var srcs = CryptoJS__default['default'].enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS__default['default'].AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS__default['default'].mode.CBC, padding: CryptoJS__default['default'].pad.Pkcs7 });
        var decryptedStr = decrypt.toString(CryptoJS__default['default'].enc.Utf8);
        return decryptedStr.toString();
    }

    exports.Decrypt = Decrypt;
    exports.Encrypt = Encrypt;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
