import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { clearAuth } from '../../features/users/authSlice';
import { setCart } from '../../features/products/AddtoCardSlice';
import { setWishlist } from '../../features/products/WishlistSlice';

import { useGetOrdersQuery } from '../../features/products/orderApi';
import { useUpdateUserMutation } from '../../features/users/authApi';

import Orderdetail from '../../Components/orderdetail/Orderdetail';

import './Account.css';

const Account = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderinfotoggle, setOrderinfotoggle] = useState(false);
    const [edittoggle, setEdittoggle] = useState(false);

    const { data: yourOrders } = useGetOrdersQuery(user?.id, { skip: !user?.id });
    const [updateUser] = useUpdateUserMutation();

    const [userdetail, setUserdetail] = useState(user || {});
    const [userdetailerror, setUserdetailerror] = useState({});

    useEffect(() => {
        setUserdetail(user || {});
    }, [user]);

    const handlelogOut = async () => {
        try {
            localStorage.removeItem('token');
            dispatch(clearAuth(null));
            dispatch(setCart([]));
            dispatch(setWishlist([]));
            toast.success('Logged out successfully!');
            navigate("/");
        } catch (error) {
            toast.error('Logout failed. Please try again.');
        }
    };

    const handeleditpersonalinfo = async (e) => {
        e.preventDefault();
        if (!handelEditError()) {
            return;
        }

        try {
            await updateUser(userdetail).unwrap();
            setEdittoggle(false);
            toast.success('Edited successfully!');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handelcancel = () => {
        setUserdetail(user || {});
        setEdittoggle(false);
    };

    const handelEditError = () => {
        const newErrors = {};
        if (!userdetail.name) newErrors.name = 'Name is required.';
        if (!userdetail.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(userdetail.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!userdetail.phone) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(userdetail.phone)) {
            newErrors.phone = 'Phone number must be 10 digits.';
        }
        setUserdetailerror(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <section className='account-wrap-sec'>
                <div className='container'>
                    <h2>My Account</h2>
                    <div className='row acc-mob-fld'>
                        <div className='col-md-3'>
                            <div className='accnt-l-wrap'>
                                <ul className='accnt-ul-wrap'>
                                    <li onClick={() => setOrderinfotoggle(false)}>Dashboard</li>
                                    <li onClick={() => setOrderinfotoggle(true)}>Order Info</li>
                                    <li>
                                        <Link to='/wishlist' className='nav-link'>
                                            Your Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/cart' className='nav-link'>
                                            Your Cart
                                        </Link>
                                    </li>
                                    <li onClick={handlelogOut} className='log-ot-ac' style={{ color: "#e61c1c" }}>Log Out</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            {
                                !orderinfotoggle ?
                                    <div className='accnt-r-wrap'>
                                        <h4 className='acct-r-t'>Personal Information</h4>
                                        {!edittoggle ? (
                                            <div>
                                                <table className='acct-table'>
                                                    <tbody>
                                                        <tr>
                                                            <td>Name:</td>
                                                            <td>{user?.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Email:</td>
                                                            <td><span>{user?.email}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phone no:</td>
                                                            <td>{user?.phone}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button
                                                    className='acct-btn-edit'
                                                    onClick={() => setEdittoggle(true)}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <form onSubmit={handeleditpersonalinfo}>
                                                    <div className='row row-gap-4 mt-5'>
                                                        <div className='col-lg-6 col-md-12 '>
                                                            <input
                                                                type='text'
                                                                value={userdetail.name || ''}
                                                                onChange={(e) =>
                                                                    setUserdetail({
                                                                        ...userdetail,
                                                                        name: e.target.value,
                                                                    })
                                                                }
                                                                placeholder='Your Name'
                                                                className='acnt-form-inp'
                                                            />
                                                            {userdetailerror.name && (
                                                                <div className='err-acted'>
                                                                    {userdetailerror.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='col-lg-6 col-md-12'>
                                                            <input
                                                                type='text'
                                                                value={userdetail.email || ''}
                                                                onChange={(e) =>
                                                                    setUserdetail({
                                                                        ...userdetail,
                                                                        email: e.target.value,
                                                                    })
                                                                }
                                                                placeholder='Your Email'
                                                                className='acnt-form-inp'
                                                            />
                                                            {userdetailerror.email && (
                                                                <div className='err-acted'>
                                                                    {userdetailerror.email}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <input
                                                                type='number'
                                                                value={userdetail.phone || ''}
                                                                onChange={(e) =>
                                                                    setUserdetail({
                                                                        ...userdetail,
                                                                        phone: e.target.value,
                                                                    })
                                                                }
                                                                placeholder='Your Phone number'
                                                                className='acnt-form-inp'
                                                            />
                                                            {userdetailerror.phone && (
                                                                <div className='err-acted'>
                                                                    {userdetailerror.phone}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button className='acct-btn-edit mt-4' type='submit'>
                                                        Submit
                                                    </button>
                                                    <button
                                                        className='acct-btn-edit mx-4'
                                                        onClick={handelcancel}
                                                        type='button'
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                    :
                                    <div className='accnt-r-wrap'>
                                        <h4 className='acct-r-t'>Order Information</h4>
                                        <Orderdetail yourOrders={yourOrders?.data} />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Account;
