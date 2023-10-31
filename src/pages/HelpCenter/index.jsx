import MainLayout from "../../components/MainLayout/MainLayout";
import { HelpCenterComponent } from "./components";


export default function HelpCenter () {
    return <MainLayout children={<HelpCenterComponent />} type="HelpCenter" />
}