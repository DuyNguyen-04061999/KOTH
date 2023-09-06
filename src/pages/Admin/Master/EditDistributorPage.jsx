import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailDistributor } from '../../../redux-saga-middleware_admin/reducers/adminMasterReducer'
import { useParams } from 'react-router-dom'

export default function EditDistributorPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { detailDistributor } = useSelector(state => state.adminMasterReducer)

    console.log(detailDistributor);

    useEffect(() => {
      dispatch(getDetailDistributor({ id }))
    }, [dispatch, id])

    return (
      <div>EditDistributorPage</div>
    )
}
