import React, { useState } from 'react';
import { Button, TextField, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/styles';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles((theme) => ({
    app:{
        paddingTop: '50px',
        maxWidth: '1920px',
        margin: '0',
    },
    root:{
        flexGrow: '1',
        paddingBottom: '50px',
    },
    textField:{
        width: '100%',
        fontSize: '25px',
    },
    btn: {
        width: '100%',
        marginTop: '15px',
        backgroundColor: '3dc000',
        '&:hover': {
            backgroundColor: '3dc000',
        },
    },
    media: {
        height: 140,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '15px 0px 0px'
    },
    starIcon: {
        color: '#f0c60b'
    },
    watchersIcon: {
        color: '#58a6ff',
    },
    count: {
        marginLeft: '25px',
        fontWeight: '700'
    },
    description: {
        height: '50px',
        overflow: 'hidden !important',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}));

function App() {

    const classes = useStyles();

    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        if (value !== "") {
            axios
                .get(`https://api.github.com/search/repositories?q=${value}`)
                .then((res) => setResult(res.data.items))
                .catch((err) => alert('Error...'));
        }else{
            alert('Начните вводить текст для поиска')
        }

    };

  return (
    <div className={classes.app}>
        <Grid container className={classes.root} spacing={6} alignItems='center'>
            <Grid item xs={9}>
                <TextField
                    id='standard-basic'
                    label='Введите текст для поиска'
                    className={classes.textField}
                    value={value}
                    onChange={handleInput}
                    />
            </Grid>
            <Grid item xs={3}>
                <Button
                vaariant='contained'
                color='primary'
                className={classes.btn}
                onClick={handleClick}>
                    Поиск
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={6} alignItems='center'>
            {result.length < 1 ? (
                <></>
            ) : (
                result.map((item) => {
                    return (
                        <Grid item xs={4} key={item.id}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={item.owner.avatar_url}
                                        title='avatar'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant='h5' component='h2'>
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                component='p'
                                                className={classes.description}
                                                >
                                                {item.description}
                                            </Typography>
                                            <div className={classes.flex}>
                                                <div className={classes.flex}>
                                                    <StarIcon className={classes.StarIcon}/>
                                                    <div className={classes.count}>{item.stargazers_count}</div>
                                                </div>
                                                <div className={classes.flex}>
                                                    <VisibilityIcon className={classes.watchersIcon}/>
                                                    <div className={classes.count}>{item.watchers_count}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size='small' color='primary'>
                                        <a href={item.html_url}>Перейти</a>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
            )}
        </Grid>
    </div>
  );
}

export default App;
