import { memo } from 'react';

const ShippingForm = ({
    userDetails,
    formErrors,
    countries,
    states,
    cities,
    handleInputChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-md-6">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                    />
                    {formErrors.name && <p className="error" style={{color:"red"}}>{formErrors.name}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email && <p className="error" style={{color:"red"}}>{formErrors.email}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>Phone:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                    />
                    {formErrors.phone && <p className="error" style={{color:"red"}}>{formErrors.phone}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>Address 1:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address1"
                        value={userDetails.address1}
                        onChange={handleInputChange}
                    />
                    {formErrors.address1 && <p className="error"style={{color:"red"}}>{formErrors.address1}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>Country:</label>
                    <select
                        className="form-control"
                        name="country"
                        value={userDetails.country}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Select Country --</option>
                        {countries.map((c) => (
                            <option key={c.isoCode} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.country && <p className="error" style={{color:"red"}}>{formErrors.country}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>State:</label>
                    <select
                        className="form-control"
                        name="state"
                        value={userDetails.state}
                        onChange={handleInputChange}
                        disabled={!states.length}
                    >
                        <option value="">-- Select State --</option>
                        {states.map((s) => (
                            <option key={s.isoCode} value={s.name}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.state && <p className="error" style={{color:"red"}}>{formErrors.state}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>City:</label>
                    <select
                        className="form-control"
                        name="city"
                        value={userDetails.city}
                        onChange={handleInputChange}
                        disabled={!cities.length}
                    >
                        <option value="">-- Select City --</option>
                        {cities.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.city && <p className="error"style={{color:"red"}}>{formErrors.city}</p>}
                </div>

                <div className="form-group col-md-6">
                    <label>Pincode:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={userDetails.pincode}
                        onChange={handleInputChange}
                    />
                    {formErrors.pincode && <p className="error"style={{color:"red"}}>{formErrors.pincode}</p>}
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary mt-2 mb-3">
                        Continue
                    </button>
                </div>
            </div>
        </form>
    );
};

export default memo(ShippingForm);
