import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectUserById } from './userSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FetchDataErrorMessage, Loading } from '../components';
import EditUserForm from './EditUserForm';

const EditUser = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, id));
  const { getUsersStatus } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    if (getUsersStatus === ACTION_STATUS.IDLE) {
      dispatch(getUsers());
    }
  }, []);

  if (getUsersStatus === ACTION_STATUS.IDLE ||
     getUsersStatus === ACTION_STATUS.LOADING) {

    return <Loading />;
  }

  if (getUsersStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <EditUserForm user={user} />
  );
};

export default EditUser;
