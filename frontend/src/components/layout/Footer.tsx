import {Fragment} from "react";

export default function Footer() {
    return (
        <Fragment>
            <footer className="footer-container">
                <div className="footer-inner">

                    <div className="footer-about">
                        <h4>About Museum</h4>
                        <p>
                            파주 박물관은 전시, 소장품, 문화 콘텐츠를 누구나 쉽게
                            감상할 수 있도록 제공하는 디지털 공간입니다.
                        </p>
                    </div>

                    <div className="footer-hours">
                        <h4>Open Hours</h4>
                        <ul>
                            <li>Monday 9:00 - 24:00</li>
                            <li>Tuesday 9:00 - 24:00</li>
                            <li>Wednesday 9:00 - 24:00</li>
                            <li>Thursday 9:00 - 24:00</li>
                            <li>Friday 9:00 - 02:00</li>
                            <li>Saturday 9:00 - 02:00</li>
                            <li>Sunday Closed</li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4>Newsletter</h4>
                        <p>
                            전시 소식과 새로운 콘텐츠를 메일로 받아보세요.
                        </p>

                        <div className="footer-newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="footer-input"
                            />
                            <button className="footer-submit-btn">Submit</button>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    Copyright © 2019. All Right Reserved. Design by ChatGPT
                </div>
            </footer>
        </Fragment>
    )
}