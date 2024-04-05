import MainLayout from "../../components/MainLayout/MainLayout";
import { getAppType } from "../../utils/helper";

export default function NewsPage() {
    return (
        <MainLayout 
            children={
                <>
                    {getAppType() === "promote" ? (<></>) : (<></>)}
                </>
            }
        />
    )
}