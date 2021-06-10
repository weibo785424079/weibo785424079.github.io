# 常用工具类 

## 对称加密解密

### 安装
```bash
# 安装
yarn add @tms/platform-utils

```

### 使用 
```js
import { Encrypt, Decrypt } from '@tms/platform-utils'

const encryptStr = Encrypt('abc'); // 加密成密文
const decryptStr = Decrypt(encryptStr); //解密成 “abc”

```