import { useState, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';

const useShippingHandling = (baseTotal) => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const countries = useMemo(() => Country.getAllCountries(), []);

    const selectedCountry = useMemo(
        () => countries.find((c) => c.name === userDetails.country),
        [countries, userDetails.country]
    );

    const states = useMemo(
        () => (selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []),
        [selectedCountry]
    );

    const selectedState = useMemo(
        () => states.find((s) => s.name === userDetails.state),
        [states, userDetails.state]
    );

    const cities = useMemo(
        () =>
            selectedCountry && selectedState
                ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
                : [],
        [selectedCountry, selectedState]
    );

    const shippingCharge = useMemo(() => {
        if (!userDetails.country) return 0;
        return userDetails.country !== 'India' ? 2000 : 0;
    }, [userDetails.country]);

    const finalTotal = useMemo(
        () => baseTotal + shippingCharge,
        [baseTotal, shippingCharge]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'country') {
            setUserDetails((prev) => ({ ...prev, country: value, state: '', city: '' }));
            return;
        } else if (name === 'state') {
            setUserDetails((prev) => ({ ...prev, state: value, city: '' }));
            return;
        } else {
            if (name === 'phone' && !/^\d*$/.test(value)) return;
            if (name === 'pincode' && userDetails.country === 'India' && !/^\d*$/.test(value)) return;
            if (name === 'pincode' && userDetails.country !== 'India' && !/^[A-Za-z0-9\s-]*$/.test(value)) return;
            setUserDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        let errors = {};

        if (!userDetails.name.trim()) errors.name = 'Name is required';
        if (!userDetails.email.trim()) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) errors.email = 'Enter a valid email';
        if (!userDetails.phone.trim()) errors.phone = 'Mobile is required';
        else if (!/^\d{10}$/.test(userDetails.phone)) errors.phone = 'Enter 10-digit phone';
        if (!userDetails.address1.trim()) errors.address1 = 'Address is required';
        if (!userDetails.country.trim()) errors.country = 'Country is required';
        if (!userDetails.state.trim()) errors.state = 'State is required';
        if (!userDetails.city.trim()) errors.city = 'City is required';
        if (!userDetails.pincode.trim()) errors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(userDetails.pincode)) errors.pincode = 'Enter 6-digit pincode';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return {
        userDetails,
        formErrors,
        countries,
        states,
        cities,
        shippingCharge,
        finalTotal,
        handleInputChange,
        validateForm,
    };
};

export default useShippingHandling;
