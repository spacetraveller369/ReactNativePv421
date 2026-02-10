import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const CalcStyle = StyleSheet.create({
  
   calc: {
    flex: 1,
    padding: 10,              
    backgroundColor: "#1C1C1C", 
    justifyContent: "space-between", 
   },
   result: {
    color: textColor,         
    textAlign: "right",       
    fontWeight: "300",       
    paddingRight: 10,
    marginBottom: 20,
   },
   expression: {
    color: "#777",            
    textAlign: "right",       
    fontSize: 20,
    marginBottom: 5,
   },
   memoryRow: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
   },
   buttonRow: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
   },
   memoryButton: {
    color: "#bbb",
   },
   // Landscape
   containerResExpMem: {
      flex: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   containerExpMem: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
   }
});

export default CalcStyle;
