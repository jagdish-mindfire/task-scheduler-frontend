import CONSTANTS_STRING from "../../constants/strings";

export default function Footer () {
    return (<><div style={{position:'fixed',width:'100%'}} className="left-0 bottom-0 text-center bg-gray-400 p-3 origin-bottom-right ">
        {CONSTANTS_STRING.COPYRIGHT_TEXT}
        </div></>);
}