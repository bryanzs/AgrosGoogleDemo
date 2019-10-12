import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { firestore } from '../../../../firebase';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { history, className } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const name = firstName.concat(" ").concat(lastName);
    const email = event.target.email.value;
    const password = event.target.password.value;
    const company = event.target.company.value;
    const phone = event.target.phone.value;
    firestore.collection('users').add({
      name: name,
      email: email,
      password: password,
      company: company,
      phone: Number(phone),
    }).then(() => {
      history.push('/users');
    })
    .catch(err => console.err(err));
  }

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <CardHeader
          title="Agregar Usuario"
          subheader="Completar todos los campos del formulario"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombres"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Apellidos"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Empresa"
                margin="dense"
                name="company"
                onChange={handleChange}
                value={values.company}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Número de Teléfono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Correo Electrónico"
                margin="dense"
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nueva Contraseña"
                margin="dense"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Agregar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(AccountDetails);
