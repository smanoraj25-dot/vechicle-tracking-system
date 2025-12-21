import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../features/users/authSlice';
import useSWR from 'swr';
import Orderdetail from '../../Components/orderdetail/Orderdetail';
import {setCart} from "../../features/products/AddtoCardSlice";
import {setWishlist} from "../../features/products/WishlistSlice";
import { useNavigate } from "react-router-dom";
const fetcher =async (url, token) =>
 await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>{
      return res.data
      } 
    )
    .catch((error) => {
      console.error('Error fetching data:', error);
      
    });
    
const Account = () => {

  const API_URL = import.meta.env.VITE_BACKENDURL;

  const [orderinfotoggle,setOrderinfotoggle]=useState(false);
  const [yourOrders,setYourOrders]=useState();
  const [edittoggle, setEdittoggle] = useState(false);
  const { isLogin, user } = useSelector((state) => state.auth);
  const [defaultuserdetail, setDefaultUserdetail] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
 const { data } = useSWR(
    token && isLogin ? [`${API_URL}/api/users/user-details`, token] : null,
    ([url, token]) => fetcher(url, token)
  );
  
  useEffect(() => {
    if(data){
    const fetchUserDetails = async () => {
      if (token) {
        try {
          setDefaultUserdetail({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
          });
          setUserdetail(data);
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };
    fetchUserDetails();
  }
  }, [data]);

  const handlelogOut = () => {
    
    localStorage.removeItem('token');
    dispatch(clearUser(null));
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    toast.success('Logged out successfully!');
    navigate("/");
  };

  const [userdetail, setUserdetail] = useState(defaultuserdetail);
  const [userdetailerror, setUserdetailerror] = useState({});

  const handeleditpersonalinfo = async (e) => {
    e.preventDefault();
    if (!handelEditError()) {
      return;
    }

    axios
      .put(`${API_URL}/api/users/update-user`, userdetail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserdetail(response.data.user);
        setDefaultUserdetail(response.data.user);
        setEdittoggle(false);
        toast.success('Edited successfully!');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handelcancel = () => {
    setUserdetail(defaultuserdetail);
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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if(!user?.id) return;
        const res = await axios.post(`${API_URL}/api/order/getorders`, { userId: user.id });
        const data = res.data; // Axios automatically parses the JSON response
        setYourOrders(data.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]); 

  return (
    <>
      <section className='account-wrap-sec'>
        <div className='container'>
          <h2>My Account</h2>
          <div className='row acc-mob-fld'>
            <div className='col-md-3'>
              <div className='accnt-l-wrap'>
                <ul className='accnt-ul-wrap'>
                  <li onClick={()=>setOrderinfotoggle(false)}>Dashboard</li>
                  <li onClick={()=>setOrderinfotoggle(true)}>Order Info</li>
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
                  <li onClick={handlelogOut} className='log-ot-ac' style={{"color": "#e61c1c"}}>Log Out</li>
                </ul>
              </div>
            </div>
            <div className='col-md-9'>
              {
                !orderinfotoggle?
                <div className='accnt-r-wrap'>
                <h4 className='acct-r-t'>Personal Information</h4>
                {!edittoggle ? (
                  <div>
                    <table className='acct-table'>
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>{defaultuserdetail.name}</td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td><span>{defaultuserdetail.email}</span></td>
                        </tr>
                        <tr>
                          <td>Phone no:</td>
                          <td>{defaultuserdetail.phone}</td>
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
                          { userdetailerror.email && (
                            <div className='err-acted'>
                              {userdetailerror.email}
                            </div>
                          ) }
                        </div>
                        <div className='col-md-6'>
                          <input
                            type='number'
                            value={ userdetail.phone || '' }
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
                    <Orderdetail  yourOrders={yourOrders}/>
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
