import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { firestore } from '../../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      firestore.collection('users').onSnapshot(snapshot => {
        const users = []
        snapshot.forEach(doc => {
          const info = doc.data();
          const user = {
            id: doc.id,
            name: info.name,
            email: info.email,
            phone: info.phone,
            company: info.company,
          };
          users.push(user);
        })
        setData(users);
      })
    }
    return () => isSubscribed = false;
  }, [])

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={data} />
      </div>
    </div>
  );
};

export default UserList;
