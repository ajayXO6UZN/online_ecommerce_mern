import { makeStyles, useTheme } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    imgStyle: {
        width: '75px',
        height: '64px',
        // backgroundColor:'#eee'
    },
    innerImage: {
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        objectFit: 'contain'
    },
    cartItems:{
        paddingLeft: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
      },
      greenColor:{
        color:props => (props.orderStatus=='delivered' ? 'green' : 'red'),
      },
      paymentStatus:{
        color:props => (props.oredrPaymentStatus=='secceeded' ? 'green' : 'red'),
      }
}));
