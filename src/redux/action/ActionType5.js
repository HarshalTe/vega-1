import * as actionType from "./ActionTypes";
const ON_TOGGLE5 = (checked)=>{
    console.log("object",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE5,
        checked: checked,
    }
}
export default ON_TOGGLE5