import BackIcon from "@mui/icons-material/ArrowBack"
import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeAccount } from '../../../redux-saga-middleware_admin/reducers/adminConfigReducer'
import { closeDetailDialog, openConfirmDialog, openProvideDialog, openResetPassDialog, openUpdateAccountDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'
import { updateDetailAccount } from '../../../redux-saga-middleware_admin/reducers/adminReducer'
import useWindowDimensions from '../../../utils/useWindowDimensions'

const ManagerIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            fill="none"
            viewBox="0 0 16 17"
            >
            <g fill="#000" clipPath="url(#clip0_4008_27626)">
                <path d="M10.439 8.9c-.097.01-.193.027-.29.028-.656.01-1.152.3-1.496.858a19.04 19.04 0 00-.575 1.006c-.328.612-.32 1.224.013 1.838.042.078.065.215.03.282-.365.628-.376 1.257-.045 1.898.014.039.024.08.03.12H.7c-.53.002-.699-.174-.699-.718v-2.297a3.421 3.421 0 01.251-1.296c.167-.411.412-.785.721-1.099.31-.314.677-.563 1.082-.733.404-.17.838-.256 1.275-.254 1.976 0 3.953-.007 5.93.005.311 0 .624.079.934.133.092.03.18.07.262.12l-.016.11zM2.808 3.533C2.815 1.55 4.378-.013 6.349 0c1.902.01 3.446 1.613 3.438 3.572-.009 1.96-1.589 3.56-3.508 3.544a3.472 3.472 0 01-2.466-1.061 3.587 3.587 0 01-1.005-2.522z"></path>
                <path d="M16.003 11.742c-.14.139-.262.302-.422.41-.263.177-.42.37-.376.725.023.191.04.338.215.434.074.048.144.1.21.16.38.291.401.386.17.799-.136.24-.276.479-.408.72-.133.243-.313.329-.57.2-.089-.043-.18-.08-.27-.119-.328-.14-.69-.1-.89.186-.113.16-.124.414-.136.629-.02.338-.175.475-.5.461-.306-.013-.613-.007-.919 0-.262.004-.412-.11-.433-.385-.007-.099-.053-.2-.04-.295.066-.448-.3-.55-.57-.691-.103-.055-.303.049-.448.109-.616.256-.614.26-.943-.318-.114-.2-.227-.404-.344-.604-.143-.241-.106-.44.121-.603.057-.052.118-.098.184-.137.435-.176.339-.562.342-.9 0-.059-.073-.129-.128-.175-.142-.12-.294-.23-.44-.345-.184-.146-.212-.324-.098-.528.169-.297.34-.594.507-.893.131-.234.312-.29.55-.176.089.043.18.08.27.119.328.141.685.103.889-.183.115-.161.125-.415.138-.63.02-.333.173-.476.5-.462.294.013.59.01.884 0 .295-.009.46.106.47.418.003.088.051.178.038.262-.072.452.314.524.565.7.05.036.164 0 .24-.028.185-.066.358-.175.547-.214.118-.024.32 0 .373.083.24.356.439.739.65 1.113.01.032.014.065.014.098l.058.06zm-4.795 1.007c-.017.808.56 1.44 1.332 1.458.797.02 1.421-.563 1.443-1.345.022-.825-.56-1.462-1.348-1.475-.788-.013-1.415.577-1.43 1.362h.003z"></path>
            </g>
            <defs>
                <clipPath id="clip0_4008_27626">
                <path fill="#fff" d="M0 0H16V16.348H0z"></path>
                </clipPath>
            </defs>
            </svg>
      );
}

const ItemDetail = (props) => {
    const { title, icon, value } = props
    return (
        <Box component={"div"} sx={{
            borderTop: "1px solid #E4E4E4"
        }}>
            <Box component={"div"} className="d-flex align-items-center pt-3 pb-3">
                <Box component={"div"} className="me-3 rounded-circle d-flex justify-content-center align-items-center" sx={{
                    background: "#F2F2F2",
                    width: 35,
                    height: 35
                }}>
                    {icon}
                </Box>
                <Box className="ms-2">
                    <Box sx={{ fontSize: 12, color: "#808191" }}>{title}</Box>
                    <Box sx={{ fontSize: 12 }}>{value}</Box>
                </Box>
            </Box>
        </Box>
    )
}

const AgentIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <g clipPath="url(#clip0_4008_27638)">
            <path d="M7.95131 -0.000453961C8.74854 0.00283424 9.52689 0.242546 10.1878 0.688348C10.8488 1.13415 11.3627 1.766 11.6644 2.50394C11.9661 3.24189 12.0421 4.05275 11.8829 4.83392C11.7236 5.6151 11.3362 6.33146 10.7696 6.89237C10.2031 7.45328 9.48286 7.83352 8.70013 7.98497C7.9174 8.13641 7.10734 8.05227 6.37245 7.74317C5.63757 7.43407 5.01089 6.91392 4.57173 6.24853C4.13256 5.58315 3.90065 4.80244 3.90534 4.00521C3.91162 2.93779 4.3412 1.91648 5.09976 1.16548C5.85832 0.41447 6.88388 -0.00485656 7.95131 -0.000453961Z" fill="black"/>
            <path d="M9.06064 12.9513C9.18224 14.04 8.88219 15.1013 9.37507 16.123H1.97678C0.493816 16.123 -0.260259 15.1963 0.0829603 13.7558C0.679457 11.2474 2.15523 9.43277 4.45271 8.27143C4.68944 8.15199 4.84486 8.18869 5.0636 8.31964C5.53346 8.60026 6.03354 8.82764 6.55449 9.09386C6.34366 9.62704 6.12996 10.2084 5.88316 10.7761C5.62053 11.3827 5.72342 11.8886 6.20911 12.3332C6.48325 12.5843 6.73581 12.8578 7.0006 13.1197C7.61293 13.7263 8.23317 13.7327 8.85269 13.1405C8.91025 13.0837 8.97069 13.0319 9.06064 12.9513Z" fill="black"/>
            <path d="M12.5424 16.1173C12.097 16.1173 11.7012 16.1346 11.3084 16.113C11.023 16.099 10.7537 15.9765 10.5557 15.7705C10.3578 15.5645 10.246 15.2906 10.2434 15.0049C10.2283 13.9256 10.2348 12.8463 10.2434 11.767C10.2434 11.382 10.4312 11.0805 10.7356 10.8517C11.2911 10.4337 11.843 10.012 12.4042 9.6026C12.8734 9.2601 13.3634 9.25938 13.8354 9.6026C14.3973 10.0113 14.9492 10.433 15.504 10.8517C15.6649 10.9682 15.7944 11.1227 15.881 11.3016C15.9675 11.4804 16.0083 11.6779 15.9997 11.8763C15.9947 12.8837 15.9997 13.8911 15.9997 14.8984C15.9954 15.6388 15.522 16.1087 14.7837 16.1216C14.4376 16.1259 14.0915 16.1216 13.6965 16.1216V14.3185C13.6965 14.1508 13.7044 13.9824 13.6965 13.8148C13.6749 13.4766 13.4346 13.2427 13.1209 13.2442C13.0453 13.2432 12.9704 13.2575 12.9005 13.2861C12.8306 13.3148 12.7672 13.3573 12.7141 13.411C12.6611 13.4648 12.6194 13.5287 12.5916 13.5989C12.5638 13.6692 12.5505 13.7443 12.5524 13.8198C12.5402 14.4904 12.5481 15.1618 12.5481 15.8345L12.5424 16.1173Z" fill="black"/>
            <path d="M7.94446 12.4684C7.60124 12.1122 7.30695 11.8295 7.04432 11.5201C7.00796 11.4669 6.98376 11.4064 6.97344 11.3429C6.96312 11.2793 6.96693 11.2143 6.9846 11.1524C7.20046 10.5681 7.42783 9.99033 7.67247 9.41974C7.70069 9.36902 7.73988 9.32525 7.78719 9.29164C7.8345 9.25803 7.88872 9.23541 7.9459 9.22546C8.02361 9.21827 8.15744 9.319 8.1927 9.40247C8.44022 9.98529 8.67479 10.5736 8.89641 11.1675C8.93023 11.2589 8.92375 11.4157 8.86619 11.4819C8.58629 11.8064 8.28336 12.1108 7.94446 12.4684Z" fill="black"/>
            <path d="M11.9097 8.53188L9.74032 10.1667C9.58921 9.78316 9.44531 9.42051 9.32227 9.10895C9.89214 8.80027 10.4318 8.50238 10.9772 8.21889C11.0687 8.17973 11.1718 8.17741 11.265 8.21241C11.4744 8.29588 11.6694 8.41028 11.9097 8.53188Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_4008_27638">
            <rect width="16" height="16.3478" fill="white"/>
            </clipPath>
            </defs>
        </svg>

    )
}

const PlayerIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
            <g clipPath="url(#clip0_4008_27652)">
            <path d="M10.1218 15.9981C8.99827 15.9981 7.87471 16.0024 6.74972 15.9981C5.85576 15.9938 5.35353 15.5224 5.35066 14.6392C5.35066 13.5056 5.28967 12.3605 5.41595 11.2384C5.66491 9.06806 7.36961 7.56282 9.60453 7.46022C10.2727 7.41781 10.9436 7.44715 11.6055 7.54775C13.3569 7.84765 14.8894 9.5624 14.9963 11.3439C15.063 12.4516 15.048 13.568 15.0279 14.6765C15.0121 15.5547 14.6282 15.9471 13.7422 15.9723C12.5361 16.006 11.3286 15.9801 10.1218 15.9801V15.9981Z" fill="black"/>
            <path d="M10.1844 6.24053C9.56692 6.2391 8.96379 6.05453 8.4513 5.71017C7.93882 5.36581 7.54002 4.87714 7.30538 4.30603C7.07074 3.73492 7.01082 3.10703 7.13319 2.50184C7.25556 1.89666 7.55473 1.34138 7.99283 0.906301C8.43092 0.471219 8.98825 0.175893 9.59427 0.057702C10.2003 -0.0604885 10.8277 0.00377093 11.3972 0.242347C11.9667 0.480922 12.4526 0.883088 12.7934 1.39794C13.1342 1.91279 13.3146 2.51718 13.3118 3.13461C13.3118 3.5443 13.2308 3.94995 13.0733 4.32818C12.9159 4.70642 12.6852 5.04978 12.3945 5.33847C12.1038 5.62716 11.7589 5.85549 11.3795 6.01031C11.0002 6.16512 10.594 6.24337 10.1844 6.24053Z" fill="black"/>
            <path d="M5.85664 7.98574C4.94689 8.90768 4.44466 9.95375 4.33919 11.1534C4.26099 12.043 4.28036 12.9413 4.26099 13.836C4.25381 14.1567 4.26099 14.4774 4.26099 14.8218C3.43518 14.8218 2.61081 14.8569 1.79936 14.8081C1.36529 14.7787 1.01947 14.3195 1.01516 13.8625C1.00081 12.4771 0.987182 11.0909 1.02162 9.70694C1.04601 8.69603 1.81084 7.73749 2.8282 7.56817C3.52917 7.45123 4.27175 7.52943 4.98922 7.59185C5.2719 7.61624 5.53736 7.83364 5.85664 7.98574Z" fill="black"/>
            <path d="M14.5859 8.0495C14.5994 8.02448 14.6148 8.0005 14.6319 7.97776C15.6844 7.1168 17.8547 7.27823 18.7573 8.28412C19.1526 8.70933 19.3725 9.26832 19.3729 9.84891C19.381 11.1404 19.381 12.4318 19.3729 13.7232C19.3729 14.3862 18.9424 14.8375 18.2859 14.8511C17.5728 14.8654 16.8589 14.8511 16.1271 14.8511C16.1271 14.3596 16.1364 13.9083 16.1271 13.4578C16.1077 12.6686 16.1156 11.8793 16.041 11.0959C15.9283 9.9142 15.4304 8.8954 14.5859 8.0495Z" fill="black"/>
            <path d="M3.89473 6.24082C3.63423 6.24455 3.37562 6.19622 3.13405 6.09867C2.89249 6.00112 2.67284 5.8563 2.48799 5.67272C2.30314 5.48914 2.15681 5.2705 2.0576 5.02961C1.95838 4.78872 1.90827 4.53044 1.91021 4.26993C1.91088 3.74779 2.11893 3.2473 2.48861 2.87856C2.67166 2.69598 2.88888 2.55125 3.12786 2.45261C3.36684 2.35398 3.62292 2.30338 3.88145 2.30371C4.13999 2.30404 4.39593 2.35529 4.63466 2.45453C4.87339 2.55378 5.09024 2.69907 5.27282 2.88212C5.4554 3.06516 5.60014 3.28238 5.69877 3.52136C5.79741 3.76035 5.848 4.01642 5.84767 4.27495C5.84919 4.53245 5.7998 4.78771 5.70235 5.02606C5.6049 5.26441 5.46131 5.48115 5.27983 5.66383C5.09835 5.84651 4.88256 5.99153 4.64486 6.09054C4.40715 6.18956 4.15223 6.24063 3.89473 6.24082Z" fill="black"/>
            <path d="M16.5209 6.24088C16.2607 6.24451 16.0023 6.19618 15.761 6.09872C15.5197 6.00125 15.3002 5.85662 15.1154 5.67328C14.9307 5.48994 14.7844 5.27158 14.6851 5.03099C14.5858 4.7904 14.5355 4.53242 14.5371 4.27215C14.538 3.75001 14.7462 3.24959 15.1161 2.88099C15.2992 2.69847 15.5164 2.55381 15.7555 2.45527C15.9945 2.35672 16.2506 2.30622 16.5091 2.30664C16.7676 2.30707 17.0236 2.35841 17.2623 2.45774C17.501 2.55707 17.7178 2.70244 17.9003 2.88555C18.0828 3.06867 18.2274 3.28594 18.326 3.52496C18.4245 3.76398 18.475 4.02007 18.4746 4.2786C18.4757 4.53589 18.426 4.79086 18.3284 5.02888C18.2307 5.26691 18.087 5.48329 17.9054 5.66562C17.7239 5.84795 17.5082 5.99262 17.2706 6.09134C17.033 6.19006 16.7782 6.24088 16.5209 6.24088Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_4008_27652">
            <rect width="20" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
}

const RegisterDateIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
            <g clipPath="url(#clip0_4008_27667)">
            <path d="M6.82632 12.7936C5.74498 12.7936 4.66092 12.7467 3.5834 12.8067C2.37821 12.8738 1.3187 11.9338 1.66677 10.4122C1.95702 9.14534 3.09838 8.16276 4.39467 8.14803C6.0205 8.12893 7.64796 8.11311 9.27325 8.1513C11.0398 8.19331 12.2074 9.7553 12.0557 11.2453C11.9619 12.164 11.2444 12.7844 10.3153 12.7915C9.15213 12.8007 7.98895 12.7936 6.82632 12.7936Z" fill="black"/>
            <path d="M6.84603 0C7.76954 0.00143973 8.65487 0.368679 9.30825 1.02134C9.96162 1.674 10.3298 2.55893 10.3323 3.48244C10.3372 5.40451 8.7501 6.98997 6.82748 6.98287C5.90891 6.96921 5.03273 6.5941 4.38885 5.93883C3.74497 5.28356 3.38527 4.40094 3.38771 3.48228C3.39015 2.56361 3.75453 1.68291 4.40189 1.03107C5.04924 0.379237 5.9274 0.00878064 6.84603 0Z" fill="black"/>
            <path d="M12.3426 6.98337C12.4173 7.06902 12.4462 7.10176 12.4741 7.13449C12.7147 7.41601 12.7136 7.76082 12.4708 7.98614C12.228 8.21147 11.8919 8.19619 11.6219 7.93159C11.2581 7.57514 10.8982 7.21542 10.5422 6.85243C10.2508 6.55509 10.2497 6.23974 10.5422 5.94349C10.8913 5.58668 11.246 5.23424 11.6017 4.88289C11.887 4.60082 12.2204 4.573 12.4708 4.80378C12.7212 5.03456 12.7141 5.38264 12.4419 5.69525C12.425 5.7149 12.4119 5.73726 12.3611 5.80928C12.5794 5.80928 12.7638 5.80928 12.9476 5.80928C13.2384 5.80928 13.5292 5.79946 13.8205 5.81365C14.1757 5.83165 14.4049 6.07771 14.3994 6.40833C14.3939 6.72585 14.1686 6.96373 13.8238 6.97846C13.461 6.99428 13.0971 6.98337 12.7327 6.98391L12.3426 6.98337Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_4008_27667">
            <rect width="16" height="12.8" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
}

export default function DetailAccountDialogComponent() {
    const { width } = useWindowDimensions()
    const { isDetailDialog } = useSelector((state) => state.adminDialogReducer);
    const { roles } = useSelector((state) => state.adminAuthReducer);
    const { detailAccount } = useSelector((state) => state.adminReducer_);
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeDetailDialog())
        dispatch(updateDetailAccount())
    }

    const handleActive = () => {
        if(detailAccount) {
          dispatch(activeAccount({
            accountName: detailAccount?.account,
            active: detailAccount?.status ? 0 : 1
          }))
        }
      }

      const handleDeleteAccount = () => {
        dispatch(openConfirmDialog("delete-account"))
      }

      const handleUpdateNickName = () => {
        dispatch(openUpdateAccountDialog())
      }

    return (
        <Dialog open={isDetailDialog} onClose={handleClose} fullScreen fullWidth sx={{
            "& .MuiPaper-root-MuiDialog-paper": {
              overflowY: "hidden",
              backgroundColor: "white",
              height: "100%",
            },
                height: "100%",
            "& .MuiDialog-container": {
                height: "100%",
              "& .MuiPaper-root": {
                width: "100%",
                height: "100%",
                overflowY: "auto",
                backgroundColor: "white",
              },
            },
          }}>
            {isDetailDialog && (
                <Box component={"div"} className='p-2 ps-4 pe-4'>
                    <Box component={"div"} className=''>
                        <BackIcon onClick={handleClose}/>
                    </Box>
                    <Box component={"div"} className='d-flex justify-content-between' sx={{
                        marginTop: "22px"
                    }}>
                        <Box component={"div"}>
                            <Box component={"div"} sx={{

                            }} className="d-flex">
                                <Typography  sx={{
                                    color: "#000",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "16px",
                                    marginLeft: "0px !important"
                                }}>{detailAccount?.account || ""}</Typography>
                                <Box component={"div"} className="ps-2 pe-2 text-white ms-2 text-center rounded" sx={{
                                    background: "#3DBAA2"
                                }}>
                                    <Typography sx={{
                                        fontSize: 12
                                    }}>
                                        {detailAccount?.id || "ID"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box component={"div"}>
                                
                            </Box>
                            <Box component={"div"} className="mt-2" sx={{
                                color: "#808191",
                                fontSize: "14px"
                            }}>
                                {detailAccount?.nickName}
                            </Box>
                            <Typography sx={{
                                marginTop: "11px"
                            }}><Box component={"span"} sx={{
                                color: "#FF7A68",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px"
                            }}>${detailAccount?.revenue}</Box></Typography>
                            <Typography sx={{
                                color: "#808191",
                                fontSize: 12
                            }}>
                                Revenue
                            </Typography>
                        </Box>
                    </Box>

                    <Box component={"div"} className="mt-4 mb-4">
                        <ItemDetail title="Manager" value={detailAccount?.manager || "Manager"} icon={<ManagerIcon/>}/>
                        <ItemDetail title="Agents" value={detailAccount?.agents || "Agents"} icon={<AgentIcon/>}/>
                        <ItemDetail title="Players" value={detailAccount?.players || "Players"} icon={<PlayerIcon/>}/>
                        <ItemDetail title="Register Date" value={detailAccount?.registerDate || "Register Date"} icon={<RegisterDateIcon/>}/>
                        <ItemDetail title="Last Login" value={detailAccount?.lastLogin || "Last Login"} icon={<ManagerIcon/>}/>
                        <ItemDetail title="Timezone" value="Chicago TMZ" icon={<ManagerIcon/>}/>
                    </Box>

                    {roles && !roles?.includes("agent") && (
                        <Box component={"div"} onClick={handleActive} className='text-center p-2 text-white' sx={{
                            marginTop: "14px",
                            borderRadius: "16px", background: detailAccount?.status ? "#355DFF" : "#FF4135"
                        }}>
                            <Typography sx={{
                                color: "#FFF",
                                textAlign: "center",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>
                                {detailAccount?.status ? "Active" : "Prohibit"}
                            </Typography>
                        </Box>
                    )}
                    <Box component={"div"} className='d-flex' sx={{
                        marginTop: "40px"
                    }}>
                        <Box component={"div"}
                            onClick={() => dispatch(openProvideDialog())}
                            className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                            borderRadius: "7.618px",
                            maxWidth: width/4,
                            boxShadow: "1px 20px 25px 5px #E4E4E4"
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="47"
                                fill="none"
                                viewBox="0 0 48 47"
                                >
                                <ellipse
                                    cx="24.301"
                                    cy="23.611"
                                    fill="url(#paint0_linear_3518_62918)"
                                    rx="23.39"
                                    ry="23.376"
                                ></ellipse>
                                <mask
                                    id="mask0_3518_62918"
                                    style={{ maskType: "luminance" }}
                                    width="48"
                                    height="47"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                >
                                    <ellipse
                                    cx="24.301"
                                    cy="23.611"
                                    fill="#fff"
                                    rx="23.39"
                                    ry="23.376"
                                    ></ellipse>
                                </mask>
                                <g mask="url(#mask0_3518_62918)">
                                    <path
                                    fill="#fff"
                                    d="M26.307 27.906c.024.01.047.023.07.036 1.212.814.899.697 2.411.705.275 0 .55.007.824-.003.734-.028 1.346-.614 1.35-1.346.014-2.215.014-4.43 0-6.645-.004-.745-.616-1.341-1.364-1.36-.593-.013-1.188-.027-1.78.009-.261.016-.528.128-.768.247-.26.13-.49.317-.748.489-.187-.145-.376-.289-.563-.435a1.436 1.436 0 00-.91-.314c-1.728 0-3.456-.004-5.183.003-.823.003-1.43.608-1.435 1.428-.006 2.161-.006 4.323 0 6.485.005.836.612 1.437 1.452 1.44 1.727.006 3.455 0 5.182 0 .321.004.634-.103.888-.3l.574-.44zm-.008-3.511a.426.426 0 11.296-.132.425.425 0 01-.296.13v.002zm-.43 1.61a.425.425 0 01.846-.073.426.426 0 01-.845.072zm.426-4.456a.425.425 0 01.421.425.425.425 0 01-.846-.003.426.426 0 01.424-.422z"
                                    ></path>
                                </g>
                                <defs>
                                    <linearGradient
                                    id="paint0_linear_3518_62918"
                                    x1="-22.48"
                                    x2="24.272"
                                    y1="23.611"
                                    y2="70.391"
                                    gradientUnits="userSpaceOnUse"
                                    >
                                    <stop stopColor="#E2C5B5"></stop>
                                    <stop offset="1" stopColor="#FF9F38"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Typography className='mt-2' sx={{
                                color: "#11142D",
                                textAlign: "center",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>
                                Provide Ticket
                            </Typography>
                        </Box>
                        {!roles?.includes("agent") && (
                            <Box component={"div"} onClick={() => dispatch(openResetPassDialog())} className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                                borderRadius: "7.618px",
                                maxWidth: width/4,
                                boxShadow: "1px 20px 25px 5px #E4E4E4"
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    >
                                    <ellipse
                                        cx="23.902"
                                        cy="23.865"
                                        fill="url(#paint0_linear_3518_62928)"
                                        rx="23.39"
                                        ry="23.376"
                                    ></ellipse>
                                    <mask
                                        id="mask0_3518_62928"
                                        style={{ maskType: "luminance" }}
                                        width="48"
                                        height="48"
                                        x="0"
                                        y="0"
                                        maskUnits="userSpaceOnUse"
                                    >
                                        <ellipse
                                        cx="23.902"
                                        cy="23.865"
                                        fill="#fff"
                                        rx="23.39"
                                        ry="23.376"
                                        ></ellipse>
                                    </mask>
                                    <g fill="#fff" mask="url(#mask0_3518_62928)">
                                        <path d="M30.138 19.058c0-.322-.003-.568 0-.814.01-.5.357-.87.825-.874.468-.005.834.364.838.86.008.864.01 1.727 0 2.591a1.097 1.097 0 01-1.092 1.11c-.873.017-1.747.015-2.62 0a.814.814 0 01-.82-.842c.006-.467.35-.806.84-.82.253-.005.507 0 .833 0-.11-.137-.169-.223-.238-.297-1.646-1.804-3.679-2.49-6.03-1.866-2.36.628-3.85 2.222-4.317 4.63a5.906 5.906 0 006.096 7.055c2.17-.096 3.816-1.148 4.922-3.025.16-.27.347-.486.672-.53.325-.043.611.066.803.344.206.298.2.612.025.927a7.539 7.539 0 01-3.108 3.074c-4.663 2.48-10.379-.43-11.13-5.665-.606-4.236 2.474-8.217 6.704-8.639 2.62-.26 4.812.612 6.584 2.554.053.058.107.114.213.227z"></path>
                                        <path d="M24.158 27.439c-.604-.027-1.208-.045-1.811-.082-.765-.048-1.317-.553-1.363-1.316-.043-.708-.028-1.423-.007-2.134.014-.497.257-.882.68-1.158a.386.386 0 00.142-.257c.032-.326.02-.656.06-.98.091-.753.663-1.348 1.423-1.412.61-.05 1.224-.05 1.835 0 .725.06 1.295.65 1.396 1.376.044.323.034.655.06.979.007.09.03.221.09.255.634.358.766.964.782 1.603.015.595-.005 1.19-.06 1.78-.067.722-.614 1.225-1.355 1.257-.622.027-1.25.006-1.872.006v.082zm-1.23-4.945h2.517c-.015-.282-.015-.55-.045-.812-.03-.263-.193-.45-.464-.461-.493-.02-.988-.02-1.48 0-.298.011-.462.213-.49.505-.024.24-.025.489-.036.766l-.002.002z"></path>
                                    </g>
                                    <defs>
                                        <linearGradient
                                        id="paint0_linear_3518_62928"
                                        x1="-22.878"
                                        x2="23.873"
                                        y1="23.865"
                                        y2="70.645"
                                        gradientUnits="userSpaceOnUse"
                                        >
                                        <stop stopColor="#B5E2E0"></stop>
                                        <stop offset="1" stopColor="#3DBAA2"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <Typography className='mt-2' sx={{
                                    color: "#11142D",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal"
                                }}>
                                    Reset Password
                                </Typography>
                            </Box>
                        )}
                        {!roles?.includes("agent") && (
                            <Box component={"div"} onClick={handleUpdateNickName} className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                                borderRadius: "7.618px",
                                maxWidth: width/4,
                                boxShadow: "1px 20px 25px 5px #E4E4E4"
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="47"
                                    height="48"
                                    fill="none"
                                    viewBox="0 0 47 48"
                                    >
                                    <ellipse
                                        cx="23.39"
                                        cy="23.865"
                                        fill="url(#paint0_linear_4861_67581)"
                                        rx="23.39"
                                        ry="23.376"
                                    ></ellipse>
                                    <mask
                                        id="mask0_4861_67581"
                                        style={{ maskType: "luminance" }}
                                        width="47"
                                        height="48"
                                        x="0"
                                        y="0"
                                        maskUnits="userSpaceOnUse"
                                    >
                                        <ellipse
                                        cx="23.39"
                                        cy="23.865"
                                        fill="#fff"
                                        rx="23.39"
                                        ry="23.376"
                                        ></ellipse>
                                    </mask>
                                    <g fill="#fff" mask="url(#mask0_4861_67581)">
                                        <path d="M24.404 20.244l3.897 3.953c-.061.03-.18.061-.255.14a2248.59 2248.59 0 00-6.231 6.24c-.407.41-.855.66-1.436.703-.669.05-1.332.162-2 .21-.951.066-1.472-.498-1.365-1.44.082-.727.136-1.459.262-2.178.054-.314.187-.672.404-.89 2.22-2.252 4.465-4.481 6.724-6.738zM28.98 23.371l-3.84-3.838c.534-.542 1.06-1.125 1.639-1.65.6-.54 1.462-.488 2.044.076.581.564 1.16 1.141 1.725 1.724.564.584.617 1.466.065 2.068-.52.57-1.095 1.09-1.634 1.62z"></path>
                                    </g>
                                    <defs>
                                        <linearGradient
                                        id="paint0_linear_4861_67581"
                                        x1="-23.39"
                                        x2="23.361"
                                        y1="23.865"
                                        y2="70.645"
                                        gradientUnits="userSpaceOnUse"
                                        >
                                        <stop stopColor="#B5E2B9"></stop>
                                        <stop offset="1" stopColor="#4FBF67"></stop>
                                        </linearGradient>
                                    </defs>
                                    </svg>
                                <Typography className='mt-2' sx={{
                                    color: "#11142D",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal"
                                }}>
                                    Nick Name
                                </Typography>
                            </Box>
                        )}
                        {!roles?.includes("agent") && !roles?.includes("distributor") && (
                            <Box component={"div"} onClick={handleDeleteAccount} className='d-flex flex-column align-items-center justify-content-center text-center p-2 me-2' sx={{
                                borderRadius: "7.618px",
                                maxWidth: width/4,
                                boxShadow: "1px 20px 25px 5px #E4E4E4"
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="47"
                                    height="47"
                                    fill="none"
                                    viewBox="0 0 47 47"
                                    >
                                    <ellipse
                                        cx="23.39"
                                        cy="23.376"
                                        fill="url(#paint0_linear_4861_67592)"
                                        rx="23.39"
                                        ry="23.376"
                                    ></ellipse>
                                    <mask
                                        id="mask0_4861_67592"
                                        style={{ maskType: "luminance" }}
                                        width="47"
                                        height="47"
                                        x="0"
                                        y="0"
                                        maskUnits="userSpaceOnUse"
                                    >
                                        <ellipse
                                        cx="23.39"
                                        cy="23.376"
                                        fill="#fff"
                                        rx="23.39"
                                        ry="23.376"
                                        ></ellipse>
                                    </mask>
                                    <g fill="#fff" mask="url(#mask0_4861_67592)">
                                        <path d="M24.828 30.498h-3.527c-.77 0-1.54.004-2.312 0-1.209-.01-2.11-1.062-1.976-2.266.118-1.074.219-2.151.296-3.23.097-1.354 1.275-2.508 2.606-2.495.159 0 .37.063.468.178.423.487.97.723 1.58.788.99.104 1.938.015 2.662-.803a.598.598 0 01.414-.163c.812.01 1.481.338 2.046.992-1.671.284-2.852 1.163-3.375 2.752-.533 1.6-.086 3.003 1.118 4.247zM22.512 22.5c-1.77 0-3.012-1.24-3.012-3.005 0-1.745 1.242-2.995 2.986-2.995 1.77 0 3.013 1.235 3.013 3 0 1.75-1.242 2.995-2.987 3z"></path>
                                        <path d="M27.494 30.498a2.999 2.999 0 11.023-5.999c1.64.003 2.984 1.36 2.98 3.01a3.003 3.003 0 01-3.003 2.99zm0-3.5c-.312 0-.625-.003-.937 0-.342.006-.56.2-.563.493-.003.293.215.503.55.506.633.006 1.267.006 1.901 0 .334-.003.554-.215.55-.507-.006-.292-.226-.486-.567-.491-.304-.006-.617 0-.93 0h-.004z"></path>
                                    </g>
                                    <defs>
                                        <linearGradient
                                        id="paint0_linear_4861_67592"
                                        x1="-23.39"
                                        x2="23.361"
                                        y1="23.376"
                                        y2="70.156"
                                        gradientUnits="userSpaceOnUse"
                                        >
                                        <stop stopColor="#E2B5BD"></stop>
                                        <stop offset="1" stopColor="#FF7A68"></stop>
                                        </linearGradient>
                                    </defs>
                                    </svg>
                                <Typography className='mt-2' sx={{
                                    color: "#11142D",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal"
                                }}>
                                    Delete Account
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Dialog>
    )
}
