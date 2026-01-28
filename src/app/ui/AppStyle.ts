import { StyleSheet } from "react-native";
import { textColor } from "../../features/values/colors";

const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  appBar: {
    paddingVertical: 9.5,
  },
  appBarTitle: {
    color: textColor,
    fontWeight: "700",
  },
  main: {
    backgroundColor: "salmon",
    flex: 1,
    width: "100%",
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 80 
  },
  // стилі для дз
  navButton: {
    backgroundColor: "#9c3f79",
    padding: 10,
    borderRadius: 15,        // округлення
    borderWidth: 2,          // рамка
    borderColor: "#777",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // тіні для iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // тіні для Android
    elevation: 8,
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: "#ddd",
  }
});

export default AppStyle;
/*
Д.З. Стилізувати надпис "Home" в навігаційній 
панелі застосунку під вигляд кнопки
(рамочка, заокруглення, відступи, *тінь)
*/
    