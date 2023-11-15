import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

class TestSkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingSkeleton: false,
            list: [],
            isNodata: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            isLoadingSkeleton: true
        })
        fetch("http://192.168.1.144:3009/api/promotions/list-promotion?typeTournament=daily")?.then(res => {
            return res?.json()
        }).then(data => {
            this.setState({
                isLoadingSkeleton: false
            })
            this.setState({
                list: data || []
            })

            if(!data || (data && data?.length <= 0)) {
                this.setState({
                    isNodata: true
                })
            }
        }).catch((e) => {
            console.log(e);
            this.setState({
                isLoadingSkeleton: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const check = this.state.isLoadingSkeleton;
        const list = this.state.list
        const isNodata = this.state.isNodata
        return (
            <div>
                {check && <Box className="text-white">This is skeleton</Box> }
                {isNodata && !check && <Box className="text-white">This is no-data</Box> }
                {!isNodata && !check && list && list?.length > 0 &&<Box className="text-white">This is data</Box>}
                
            </div>
        );
    }
}

TestSkeleton.propTypes = {

};

export default TestSkeleton;