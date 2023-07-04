import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { images } from '../../../utils/images';

export default function GameLogDetailDialog(props) {
    const { log, open, handleClose } = props;
    return (
        <Dialog open={open} onClose={handleClose} sx={{
                zIndex: 1304,
            }} fullWidth>
                <Box className="position-relative" sx={{
                    width: '100%'
                }}>
                    <Box className="position-absolute" sx={{
                        right: 0
                    }} onClick={handleClose}>
                        <CloseIcon sx={{
                            color: '#6d5b9a'
                        }}/>
                    </Box>
                    <Box className="p-2 d-flex" sx={{
                        backgroundColor: '#37285c',
                    }}>
                        <img
                            src={log && log?.gameParent && log?.gameParent?.gameAvatar ? process.env.REACT_APP_SOCKET_SERVER + "/" + log?.gameParent?.gameAvatar : images.Aa}
                            alt="..."
                            width={50}
                            height={50}
                        />
                        <Box className="ms-2 text-white">
                            <span style={{
                                color: '#acaad8'
                            }}>{}</span>
                            <br/>
                            <span style={{
                                fontSize: 10,
                                color: '#acaad8'
                            }}>{log?.gameParent && log?.gameParent?.gameName ? log?.gameParent?.gameName : "" }</span>
                        </Box>
                    </Box>
                    <Box className="p-2" sx={{
                        backgroundColor: '#2d224a'
                    }}>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                ID
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                {log?.transactionGameLog && log?.transactionGameLog?.id}
                            </Typography>
                        </Box>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                Bet Gold
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                {log?.gameLogBet}
                            </Typography>
                        </Box>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                Bet Cash
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                {}
                            </Typography>
                        </Box>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                Result
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                <span style={{
                                    color: '#fc3c3c'
                                }}>{log?.gameLogResult}</span>
                            </Typography>
                        </Box>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                Detail
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                
                            </Typography>
                        </Box>
                        <Box className="d-flex justify-content-between pb-2">
                            <Typography sx={{
                                fontSize: 12,
                                color: '#acaad8'
                            }}>
                                Time
                            </Typography>
                            <Typography sx={{
                                color: '#6e71d5',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}>
                                {log?.createdAt}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
        </Dialog>
    )
}
