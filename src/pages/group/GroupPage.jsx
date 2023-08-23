import React from 'react';
import GroupList from '../../components/groups/groups-list/GroupList';
import { group } from '../../components/testdata';
import './GroupPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../store/services/group.service';
import { selectGroupsLoading } from '../../store/slices/group.slice';
const GroupPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectGroupsLoading);
  React.useEffect(() => {
    dispatch(getGroups());
  }, []);
  return (
    <div className='group-page'>
      {isLoading ? <>isLoading</> : <GroupList />}
    </div>
  );
};

export default GroupPage;
