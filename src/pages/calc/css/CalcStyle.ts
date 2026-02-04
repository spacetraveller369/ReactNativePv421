import { StyleSheet } from "react-native";

const CalcStyle = StyleSheet.create({
   calc: {
    flex: 1,
    width: "100%",
    backgroundColor: "#222",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
   },
   expression: {
    fontSize: 20,
    color: "#bbb",
    textAlign: "right",
    marginTop: 40,
    paddingHorizontal: 20,
   },
   result: {
    fontSize: 40,
    color: "#ffffff", 
    textAlign: "right",
    paddingHorizontal: 20,
   },
   memoryRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
   },
   buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
   },
   memoryButton: {
    color: "#bbb",
    fontSize: 16,
   },
   // Для ландшафту
   containerResExpMem: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   containerExpMem: {
      flex: 1,
      flexDirection: "column",
   }
});

export default CalcStyle;