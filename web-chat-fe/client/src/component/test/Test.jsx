import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as authService from "./../../Redux/Auth/Action"
const Test = () => {
    const dispatch = useDispatch()
    const {auth} = useSelector(store => store);
    const token = localStorage.getItem("token");
    console.log(auth.searchUser);
     useEffect(() => {
        if (token) {
            dispatch(authService.searchUser({ keyword: "", token }));
        }
    }, [dispatch, token]);
  return (
    <div>{}</div>
  )
}

export default Test