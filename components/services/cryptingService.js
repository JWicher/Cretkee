import CryptoJS from "react-native-crypto-js";

export default {
    encrypt,
    decrypt,
    encryptProperites,
    encryptAllPasswords,
    init_encryptAllPasswords
}

async function encrypt({content, key}) {
  try{
    const encrypted = await CryptoJS.AES.encrypt(content, key).toString();
    return encrypted
  }
  catch(error){
      // TODO here error message
    console.log('encrypt error', error)
  }
}

async function decrypt({content, key}) {
  try{
    console.log('decrypt content', content)

    let bytes  = await CryptoJS.AES.decrypt(content, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decrypt originalText', originalText)

    return originalText
  }
  catch(error){
      // TODO here error message

    console.log('decrypt error', error)
    throw {text: "Decrypt error", isSilet: true}
  }
}

async function encryptProperites({credencialObject, properties, key}){
  try{
    const encryptedCredencialObject = {...credencialObject};
    const promises = properties.map( async propertie => {
      
      const encryptePassowrd = await encrypt({
        content: encryptedCredencialObject[propertie],
        key
      })

      encryptedCredencialObject[propertie] = encryptePassowrd
    })

    await Promise.all(promises)
    return encryptedCredencialObject
  }
  catch(error){
      // TODO here error message

      console.log('encryptProperites error', error)
  }

}

async function encryptAllPasswords(credencials, oldPasswordKey, newPasswordKey) {
  const aLotOfPromisesToDecryptPassword = credencials.map( async cred => {
    const decryptedPassword = await decrypt({content: cred.password, key: oldPasswordKey});
    const encryptedNewPassowrd = await encrypt({content: decryptedPassword, key: newPasswordKey});
    return {...cred, ...{password: encryptedNewPassowrd}}
  })

  const credencialsWithChangedPasswordKey = await Promise.all(aLotOfPromisesToDecryptPassword);
  return credencialsWithChangedPasswordKey;
}

async function init_encryptAllPasswords(credencials, key) {
  const aLotOfPromisesToDecryptPassword = credencials.map( async cred => {
    const encryptedNewPassowrd = await encrypt({content: cred.password, key: key});
    return {...cred, ...{password: encryptedNewPassowrd}}
  })

  const credencialsWithChangedPasswordKey = await Promise.all(aLotOfPromisesToDecryptPassword);
  return credencialsWithChangedPasswordKey;
}