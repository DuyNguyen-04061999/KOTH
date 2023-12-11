import { Autocomplete, Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";

export default function SystemBalance() {
    const { tokenUser } = useSelector(state => state.userReducer)
    const [listEndPromotion, setListEndPromotion] = useState([])
    const [selectedPromotion, setSelectedPromotion] = useState("")
    const [selectedPromotionId, setSelectedPromotionId] = useState("")

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [selectedUserId, setSelectedUserId] = useState("")

    const [selectedUserVerify, setSelectedUserVerify] = useState("")
    const [selectedUserVerifyId, setSelectedUserVerifyId] = useState("")

    const [score, setScore] = useState(0)
    const [datePlay, setDatePlay] = useState(new Date())

    const [dateType, setDateType] = useState(0)

    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [dataExcel, setDataExcel] = useState([]);
    const [loadingExcel, setLoadingExcel] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        // const key = window.prompt("Please enter key!")
        // if(key !== "somethingwenterror") {
        //     navigate("/")
        // }
    }, [navigate])

    const fetchDataPromotion = async (search) => {
        try {
            setLoading(true);
            const response = await fetch(search ? `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/list-end-promotion?search=${search}` : 
            `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/list-end-promotion`)
            if (response.ok) {
                // Parse the response JSON
                const result = await response.json();
                setListEndPromotion(result || [])
            } else {
                // Handle errors, e.g., set an error state
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataUser = async (search) => {
        try {
            setLoadingUser(true);
            const response = await fetch(search ? `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/list-user?search=${search}` : 
            `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/list-user`)
            if (response.ok) {
                // Parse the response JSON
                const result = await response.json();
                setListUser(result || [])
            } else {
                // Handle errors, e.g., set an error state
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error fetching data:', error.message);
        } finally {
            setLoadingUser(false);
        }
    };

    const handleGetExcel = async (type) => {
        try {
            setLoadingExcel(true);
            const response = await fetch(type ? `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/export-promotion-result-excel?type=1` : 
            `${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/export-promotion-result-excel`)
            if (response.ok) {
                // Parse the response JSON
                const result = await response.json();
                setDataExcel(result || [])
            } else {
                // Handle errors, e.g., set an error state
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error fetching data:', error.message);
        } finally {
            setLoadingExcel(false);
        }
    }

    useEffect(() => {    
        // Call the fetchData function
        fetchDataPromotion();
        fetchDataUser()
        handleGetExcel()
    }, [])

    const autocompleteRef = useRef();

    const handleUpdateScorePromotion = async () => {
        if(!selectedPromotionId || !selectedUserId || !score || !datePlay) {
            alert("Please fill informations")
        } else {
            await fetch(`${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/update-score-promotion`, { method: "POST", body: JSON.stringify({
                pId: selectedPromotionId,
                uId: selectedUserId,
                score,
                date: datePlay
            }), headers: {
                "Content-Type": "application/json"
            }})
        }
    }

    const handleUpdateScorePromotionVerify = async () => {
        if(!selectedUserVerifyId) {
            alert("Please fill informations")
        } else {
            await fetch(`${process.env.REACT_APP_PROMOTION_URL}/api/system/balance/update-phone-verify`, { method: "POST", body: JSON.stringify({
                uId: selectedUserVerifyId,
            }), headers: {
                "Content-Type": "application/json"
            }})
        }
    }

    useEffect(() => {
        if(dateType) {
            handleGetExcel(1)
        } else {
            handleGetExcel()
        }
    }, [dateType])

    const [csvData, setCSVData] = useState([
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ])

    useEffect(() => {
        const csvData = dataExcel?.map((item) => {
            return [
                item?.promotionId,
                item?.promotionTitle,
                item?.promotionEnd,
                item?.playerId,
                item?.playerName,
                item?.playerNickName,
                item?.playerEmail,
                item?.playerPhone,
                item?.playerAddress1,
                item?.playerAddress2,
                item?.playerCity,
                item?.playerState,
                item?.score,
                item?.scoreCreate,
            ]
        })

        setCSVData([[
            "Promotion ID", 
            "Promotion Name", 
            "Promotion End At", 
            "User ID", 
            "User Name", 
            "User Nick Name",
            "Email",
            "Phone",
            "Address One",
            "Address Two",
            "City",
            "State",
            "Score",
            "Score Created At",
            ], ...csvData])
    }, [dataExcel])

    return (
        <>
            {loading && loadingUser && loadingExcel}
            {!tokenUser ? <Navigate to={"/"}/> : (
                <Box component={"div"} sx={{
                    minHeight: "100vh"
                }} className='bg-white p-2'>
                    <Box>
                        <b>System Balance</b>
                        <Autocomplete
                            ref={autocompleteRef}
                            disablePortal
                            id="combo-list-end-promotion"
                            className='mt-2'
                            options={listEndPromotion}
                            getOptionLabel={option => option?.tournamentName || selectedPromotion || ""}
                            sx={{ width: 400 }}
                            value={selectedPromotion || ""}
                            defaultValue={selectedPromotion || ""}
                            onChange={(e, value) => {
                                setSelectedPromotion(value?.tournamentName || "")
                                setSelectedPromotionId(value?.id || 0)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option && option.tournamentName !== ""
                            }
                            renderInput={(params) => <Box>
                                <TextField {...params} label="Select Promotion" />
                            </Box>}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-list-user"
                            className='mt-2'
                            options={listUser}
                            getOptionLabel={option => option?.userNickName || selectedUser || ""}
                            sx={{ width: 400 }}
                            value={selectedUser || ""}
                            defaultValue={selectedUser || ""}
                            onChange={(e, value) => {
                                setSelectedUser(value?.userNickName || "")
                                setSelectedUserId(value?.id || 0)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option && option.userNickName !== ""
                            }
                            renderInput={(params) => <Box>
                                <TextField {...params} label="Select User" />
                            </Box>}
                        />

                        <TextField placeholder='Score' onChange={(e) => setScore(e.target.value)} type='number' className='mt-2'/>

                        <TextField placeholder='Date' onChange={(e) => setDatePlay(e.target.value)} type='date' className='mt-2 ms-1'/>

                        <Button className='bg-info text-white p-2 p-3 ms-2 mt-2' onClick={handleUpdateScorePromotion}>Process</Button>
                    </Box>
                    <Box component={"div"} className='mt-3'>
                        <b>Verify Account</b>
                        <Autocomplete
                            disablePortal
                            id="combo-list-user-verify"
                            className='mt-2'
                            options={listUser}
                            getOptionLabel={option => option?.userNickName || selectedUserVerify || ""}
                            sx={{ width: 400 }}
                            value={selectedUserVerify || ""}
                            defaultValue={selectedUserVerify || ""}
                            onChange={(e, value) => {
                                setSelectedUserVerify(value?.userNickName || "")
                                setSelectedUserVerifyId(value?.id || 0)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option && option.userNickName !== ""
                            }
                            renderInput={(params) => <Box>
                                <TextField {...params} label="Select User" />
                            </Box>}
                        />
                        <Button className='bg-info text-white p-2 p-3 mt-2' onClick={handleUpdateScorePromotionVerify}>Process</Button>

                    </Box>

                    <Box component={"div"} className='mt-3'>
                        <b>Export Excel</b>
                       <Box>
                        <FormControl>
                                <RadioGroup
                                    value={dateType}
                                    onChange={(e) => {
                                        setDateType(Number(e.target.value))
                                    }}
                                    aria-labelledby="demo-radio-buttons-date-label"
                                    defaultValue="0"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="Today" />
                                    <FormControlLabel value="1" control={<Radio />} label="All" />
                                </RadioGroup>
                            </FormControl>
                       </Box>
                        <Box>
                            <CSVLink data={csvData || []} filename={dateType ? "all_results" : "today_results"}>
                                <Button className='bg-success text-white p-2 p-3 mt-2'>Process Excel</Button>    
                            </CSVLink>
                        </Box>
                    </Box>

                </Box>
            )}
        </>
    )
}
