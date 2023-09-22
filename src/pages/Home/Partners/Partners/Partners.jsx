import Marquee from "react-fast-marquee";

import mastercardImg from '../../../../assets/images/mastercard.png';
import visacardImg from '../../../../assets/images/visa.png';
import americanexpressImg from '../../../../assets/images/american-express.jpg';
import discoverImg from '../../../../assets/images/discover.jpg';
import unionpayImg from '../../../../assets/images/union-pay.png';
import stripeImg from '../../../../assets/images/stripe.png';

const Partners = () => {
    return (
        <div className="pt-28 pb-32 bg-green-50">
            <h2 className="text-center text-3xl font-medium mb-24 uppercase tracking-wider">Our Partners</h2>
            <div className="max-w-6xl mx-auto">
                <Marquee>
                    <div className="w-40 h-32 mx-8">
                        <img src={mastercardImg} />
                    </div>
                    <div className="w-40 h-32 mx-8">
                        <img src={visacardImg} />
                    </div>
                    <div className="w-40 h-32 mx-8">
                        <img src={americanexpressImg} />
                    </div>
                    <div className="w-40 h-32 mx-8">
                        <img src={discoverImg} />
                    </div>
                    <div className="w-40 h-32 mx-8">
                        <img src={unionpayImg} />
                    </div>
                    <div className="w-40 h-32 mx-8">
                        <img src={stripeImg} />
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Partners;