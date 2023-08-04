import Layout from "../../components/Layout";
import { Package } from "./component";

export default function PackagePage () {
    return (
        <Layout 
            children={
                <>
                    <Package />
                </>
            }
        />
    )
}