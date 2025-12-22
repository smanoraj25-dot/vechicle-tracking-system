import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Contact/Contact.css';
//icons
import { MdEmail, MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    comment: '',
    subject: ""
  });
  
  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    email: '',
    comment: '',
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.comment) {
      newErrors.comment = 'Comment is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
    }
  };

 
  const Contactinfo = [
    {
      icon: <MdEmail />,
      detail: "seelaikaari123@gmail.com",
      name: "Email:",
    },
    {
      icon: <MdCall />,
      detail: "+91-9159312346",
      name: "Phone:",

    },
    {
      icon: <FaLocationDot />,
      detail: "No 21, soundara Pandian street, Ashok Nagar ,Chennai 600083",
      name: "Location:",

    },
  ]
  return (
    <>
      <section className='contact-sec-1-wrapper'>
        <div className="container">
          <h3 className='cont-hts'>Contact Details</h3>

          <div className="row row-gap-5">
            <div className="col-md-6 contct-l0wrap">
              {Contactinfo.map((item, index) =>
                <div className='cont-w-sec' key={index}>
                  <h4 className='subd-h-cnt'>{item.name}</h4>
                  <div className='cont-inner-wrap'>
                    {item.icon}
                    <Link className='contLink'>{item.detail}</Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <form action="" onSubmit={handleSubmit}>
                <div className="row ">
                  <div className="col-md-6 inp-cnt-wrap">
                    <label htmlFor="" className='contact-lab-f'>Name*</label>
                    <input type="text" className='contact-inp-f' name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name" />
                    {errors.name && <p className="error-msg">{errors.name}</p>}
                  </div>
                  <div className="col-md-6 inp-cnt-wrap">
                    <label htmlFor="" className='contact-lab-f'>Phone*</label>
                    <input type="tel" className='contact-inp-f' name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number" />
                    {errors.mobile && <p className="error-msg">{errors.mobile}</p>}
                  </div>
                  <div className="col-md-6 inp-cnt-wrap">
                    <label htmlFor="" className='contact-lab-f'>Email*</label>
                    <input className='contact-inp-f' type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" />
                    {errors.email && <p className="error-msg">{errors.email}</p>}
                  </div>
                  <div className="col-md-6 inp-cnt-wrap">
                    <label htmlFor="" className='contact-lab-f'>Subject</label>
                    <input type="text" className='contact-inp-f' name='subject' value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject" />
                  </div>
                  <div className="col-md-12 inp-cnt-wrap">
                    <label htmlFor="" className='contact-lab-f'>Comment*</label>
                    <textarea name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Write your message" id="" rows="4" className='contact-inp-f cont-text-area' />
                    {errors.comment && <p className="error-msg">{errors.comment}</p>}
                  </div>
                  <div className="col-md-12 inp-cnt-wrap">
                    <button className='form-sub-btn-contact'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className='contact-sec-2-wrapper'>
        <div className="container-fluide">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.963046210445!2d80.20744607588792!3d13.038024213416831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e09cf8ba8d%3A0x7bca2c123408d611!2s21%2C%20Soundarapandian%20St%2C%20Zaffarkhanpet%2C%20Kodambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600024!5e0!3m2!1sen!2sin!4v1744103137493!5m2!1sen!2sin" width="100%" height="450"  loading="lazy" ></iframe>        </div>
      </section>
    </>
  )
};

export default Contact;
