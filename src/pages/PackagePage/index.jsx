import Layout from "../../components/Layout";
import { getAppType } from "../../utils/helper";
import { Package } from "./component";

export default function PackagePage () {
    return (
        <Layout 
            children={
                <>
                    {getAppType() === "promote" ? (<Package />) : (<></>)}
                </>
            }
        />
    )
}