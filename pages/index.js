import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// fetching the data from the api
export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json()

  //passing the data into the props
  return {
    props: {
      countries: data
    }
  }
}

// material ui styles
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

// looping through the countries and displaying the info
export default function Home({ countries }) {
  const classes = useStyles();

  return (
    <>
    <h3 className="text-center">
      View all
      <small className="text-muted"> Countries</small>
      <br></br>
    </h3>
    <div className="container">
    <div className="row">
      {countries.map((country) => (
        <div className="col-md-3" key={countries.name}>
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={country.flag}
              title="Country Flag"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {country.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <p>Capital city: {country.capital}</p>
                <p>Native name: {country.nativeName}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>More Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Sub Region: {country.subregion}</p>
            <p>Timezone: {country.timezones}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        </Card>
        <br></br>
        </div>
  
      ))}
        
    </div>
    </div>  
    </>
  );
}
