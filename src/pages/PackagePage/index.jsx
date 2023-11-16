import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/MainLayout/MainLayout";
import { getListPackage } from "../../redux-saga-middleware/reducers/appReducer";
import { getAppType } from "../../utils/helper";
import { Package } from "./component";

export default function PackagePage () {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListPackage())
    })

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