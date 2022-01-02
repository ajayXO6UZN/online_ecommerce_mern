import React from 'react';
import Layout from '../../components/Layout/Layout';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Profile = () => {


    const { name,email,gender,phone,avatar,role,status } = useSelector((state) => state.user.user);

    return (
        <>
            <Layout>
                <div class="wrapper">
                    <div class="left">
                        <img src={avatar && avatar.url} alt="user" width="158" />
                            <h4>{name && name}</h4>
                            <p>Full Stack Developer</p>
                    </div>
                    <div class="right">
                        <div class="info">
                            <h3>Information</h3>
                            <div class="info_data">
                                <div class="data">
                                    <h4>Email</h4>
                                    <p>{email && email}</p>
                                </div>
                                <div class="data">
                                    <h4>Phone</h4>
                                    <p>{phone && phone}</p>
                                </div>
                            </div>
                        </div>

                        <div class="projects">
                            <h3></h3>
                            <div class="projects_data">
                                <div class="data">
                                    <h4>Role of the user</h4>
                                    <p>{role && role}</p>
                                </div>
                                <div class="data">
                                    <h4>Status</h4>
                                    <p>{status && status}</p>
                                </div>
                            </div>
                            <h3></h3>
                            <div class="projects_data">
                                <div class="data">
                                    <h4>Gender</h4>
                                    <p>{gender && gender}</p>
                                </div>
                              
                            </div>
                        </div>

                        <div class="social_media">
                            <ul>
                                <li><a href="#"><i className='fab'><FacebookIcon /></i></a></li>
                                <li><a href="#"><InstagramIcon /></a></li>
                                <li><a href="#"><LinkedInIcon /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Profile