import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import constants from "../constants/constants";

async function grandPermisions(){
    const granted1 = await PermissionsAndroid.request
    (
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    const granted2 = await PermissionsAndroid.request
    (
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

    const granted  = await PermissionsAndroid.RESULTS

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
}

async function getFileContent(){
  try {
    const path = RNFS.ExternalCachesDirectoryPath + "/" + constants.FILE_NAME;
    const fileContent = await RNFS.readFile(path, "utf8");
    return fileContent;
  }
  catch (error) {
    const filePath = await getFilePath();
    const fileContent = await RNFS.readFile(filePath, "utf8");
    return fileContent;
  }
}

async function writeFileContent(content){
  try{
    const path = RNFS.ExternalCachesDirectoryPath + "/" + constants.FILE_NAME;
    await RNFS.writeFile(path, content, 'utf8')
    console.log("File writed", path)
  }
  catch(error){
    // TODO here error message

    console.log('writeFileContent error', error)
  }
}
async function getFilePath(){
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles]
        });

        const path = res.uri;

        return path;
      }
    catch (error) {
    // TODO here error message

      console.log('getFilePath error', error)
    }
}

export default {
    getFileContent,
    writeFileContent,
    getFilePath
}
