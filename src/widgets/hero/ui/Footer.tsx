import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <small className="footer__copyright">
                    © 2016-2019 «Need for drive»
                </small>

                <address className="footer__contact">
                    <a href="tel:84952342244" className="footer__phone">
                        8 (495) 234-22-44
                    </a>
                </address>
            </div>
        </footer>
    );
};

export { Footer };
