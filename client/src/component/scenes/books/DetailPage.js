import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "80px 15px 0 15px",
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 15,
  },
}));

const DetailPage = ({ data, closeDetailPage }) => {
  const classes = useStyles();

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 5,
      backgroundColor: '#fff'
    }}>
      <div style={{position: 'absolute', top: 30, right: 30, cursor: 'pointer'}} onClick={closeDetailPage}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt={data.title} src={data.imageurl} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {data.title}
                </Typography>
                <Typography variant="h6">
                  {data.author}
                </Typography>
                <Typography variant="subtitle2">
                  <span className={"book-list-info-title"}>ISBN:&nbsp;</span>{data.isbn}<br/>
                  <span className={"book-list-info-title"}>Publisher:&nbsp;</span>{data.publisher}<br/>
                  <span className={"book-list-info-title"}>Publised:&nbsp;</span>{data.published.split('T')[0]}<br/>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {data.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default DetailPage;