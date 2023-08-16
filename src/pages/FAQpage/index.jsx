import Layout from "../../components/Layout";
import { FAQPageComponent } from "./components";

export default function FAQ () {
    return <Layout children={<FAQPageComponent />} type="FAQ" />
}