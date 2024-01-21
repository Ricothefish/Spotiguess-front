import React, {useState} from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import MusicNote from '../../assets/MusicNote';
import './PopUpPay.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import gif_monica from '../../assets/gif_monica.webp';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';

const stripePromise = loadStripe("pk_test_51OXyYTDy7uXRzgyHBqXDCpppWzpexZ9kSFmXPfxduSHlU3nRcpVdTEUFwZyYfMZ4bd1LyN0E6jvkEomMntkoKhMG00mwsYpe3U");
const urlServer = process.env.REACT_APP_URL_SERVER;
const urlClient = process.env.REACT_APP_URL_CLIENT;




function PopUpPay({ isVisible, onClose, onReplay, onGoToHome }) {
    const accessToken = Cookies.get("spotifyAuthToken");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const redirectToCheckout = async (priceId) => {
        console.log('priceId', priceId);
        const stripe = await stripePromise;
        const currentUrl = window.location.href;
        const { data } = await axios.post(`${urlServer}/create-checkout-session`, {
            priceId: priceId,
            accessToken: accessToken,
            purchaseType: 'UNLIMITED_PASS',
        });
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
    
        console.log(result);
    
        if (result.error) {
            console.error(result.error.message);
        }
    };



    

    return (
        <Modal
            className="pop-up-pay"
            title={<div className="modal-title-pay">


                <MusicNote />
                <span className="modal-title-text-pay">Oh no...</span>
                <div className='close-icon-container-pay' onClick={onClose}>
                    <CloseCircleOutlined className="close-icon-pay" /></div>
            </div>
            }
            open={isVisible}
            onCancel={onClose}
            footer={null}
            closable={false}
        >
            <div className="content-container-pay">
                <div className="text-container-pay" style={{ textAlign: 'center' }}>
                    <p>You have reached your daily limit of 5 free quizz.</p>
                    <p>Grab a pass to get <b>unlimited quizz for life.</b></p>
                </div>
                <img className='img-monica' src={gif_monica} alt='gif-monica' />
                <Button autoFocus className="hr24-button-pay" onClick={() => redirectToCheckout('price_1OaoQsDy7uXRzgyHajmhBIzl')} >
                    Unlimited pass - 4.99€
                </Button>
                <div className="text-container-pay-bottom" >
                    <p>Available only for the first 20 customers.</p>
                 
                    </div>
                
            </div>

        </Modal>
    );
}

export default PopUpPay;