import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import KeyPartInputsBox from "./keyPartInputsBox";
import TextBox from "./textBox";
import ViewText from "./viewText";
import HeaderButtons from "./headerBottons";
import constants from "../components/constants/constants";

const CredencialDetails = (props) => {
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isShowKeyInputs, setIsShowKeyInputs] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(1)
  const [key, setKey] = useState("");

  const handleInputUpdateKey = (keyPart) => {
    setKey(key + keyPart)
  }

  const encodePassword = async () => {

    props.onEncodePasswordHanndler(key);
    setIsShowKeyInputs(false);
    setIsShowDetails(false)
    setKey("")
  };

  const showDetails = () => {
    setIsShowDetails(!isShowDetails)
    setIsShowKeyInputs(!isShowKeyInputs)
  };

  const closeModal = () => {
    setKey("");
    setIsShowDetails(false)
    setIsShowKeyInputs(false)

    props.setShowDetailsMode()
  };

  const detectTitleClick = () => {
    if(!props.isDecrypted){
      return
    }

    if(titleClickCount<=2){
      setTitleClickCount(titleClickCount + 1);
    }
    else {
      setTitleClickCount(1);
      props.onSetUpdateMode(true)
    }
  };

  return (
    <Modal visible={props.isShowDetailsMode} animationType="fade">

      <View style={styles.inputContainer}>
        <HeaderButtons
          onEncodePassword={encodePassword}
          onShowDetails={showDetails}
          onCloseModal={closeModal}
          />
        <View style={styles.visiblePart}>
          <View style={styles.infoBox}>
            <View style={styles.mainInfo}>
              <ViewText
                text={props.item.name}
                dedicatedViewStyles="title"
                dedicatedTextStyles="titleText"
                selectableType={false}
                specialHandler={detectTitleClick}
              />


              <ViewText
                text={`Password: ${props.item.fakePassword}`}
                dedicatedViewStyles="textBox"
              />

              { isShowDetails && props.isDecrypted &&
                <View style={styles.additionalDetails}>
                  <TextBox title="Login" message={props.item.login} />
                  <TextBox title="Old passwords" message={props.item.oldPasswords} />
                  <TextBox title="Additinal notes" message={props.item.additinalNotes} />
                </View>
              }

            </View>

            {props.isDecrypted &&
            
              <ViewText
                text={props.item.password}
                dedicatedViewStyles="hiddenBox"
                dedicatedTextStyles="hiddenPassword"
              />
            }

          </View>
        </View>


        { isShowKeyInputs && !props.isDecrypted &&
          <KeyPartInputsBox
            inputValues={constants.KEY_INPUT_VALUES}
            onHandleInputUpdateKey={handleInputUpdateKey}
            inputSquareStyle="inputSquareBlack"
          />
        }

      </View>
    </Modal>
  );
};

export default CredencialDetails;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%"
  },
  infoBox: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },

  visiblePart: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  }
});
