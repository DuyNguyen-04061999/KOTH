import MainLayout from "../../components/MainLayout/MainLayout";
import { getAppType } from "../../utils/helper";
import { Package } from "./component";

export default function PackagePage () {
    return (
        <MainLayout 
            children={
                <>
                    {getAppType() === "promote" ? (<Package />) : (<></>)}
                </>
            }
        />
    )
}