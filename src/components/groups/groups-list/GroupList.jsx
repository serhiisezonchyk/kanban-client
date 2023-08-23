import React from 'react';
import GroupItem from '../groups-item/GroupItem';
import GroupItemAdd from '../groups-item/GroupItemAdd';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../../store/slices/group.slice';

const GroupList = () => {
  const groups = useSelector(selectGroups);
  return (
    <>
      <GroupItemAdd />
      {groups?.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </>
  );
};

export default GroupList;
