import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import countriesData from "@/data/locations.json";
import { CountriesData, State } from "@/types";

const data: CountriesData = countriesData as CountriesData;

interface AddressFormProps {
  selectedCountry: any | null;
  selectedState: any | null;
  address: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  handleCountryChange: (value: string | null) => void;
  handleStateChange: (value: string | null) => void;
  handleCityChange: (value: string | null) => void;
}

const AddressForm = ({
  selectedCountry,
  selectedState,
  address,
  handleCountryChange,
  handleStateChange,
  handleCityChange,
}: AddressFormProps) => {
  const getStates = (countryCode: string): State[] => {
    const country = data.countries.find((c) => c.code === countryCode);
    return country ? country.states : [];
  };

  const getCities = (countryCode: string, stateName: string): string[] => {
    const states = getStates(countryCode);
    const state = states.find((s) => s.name === stateName);
    return state ? state.cities : [];
  };

  return (
    <div className="col-span-12 flex flex-col flex-wrap gap-y-8 sm:flex-row md:col-span-6">
      <Input
        className="w-full sm:w-1/2 sm:px-1"
        variant="bordered"
        isRequired
        radius="lg"
        size="sm"
        label="Email"
        name="email"
        type="email"
        placeholder="user@example.com"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        errorMessage="Please enter a valid email address"
      />
      <Input
        className="w-full sm:w-1/2 sm:px-1"
        variant="bordered"
        isRequired
        radius="lg"
        size="sm"
        label="Phone"
        name="phone"
        placeholder="11-digit"
        type="tel"
        pattern="^\+?[1-9]\d{1,14}$"
        errorMessage="Please enter a valid phone number"
      />
      <Input
        className="w-full sm:px-1"
        variant="bordered"
        isRequired
        radius="lg"
        size="sm"
        label="Open Address"
        name="line1"
      />
      <Select
        className="w-full sm:w-1/2 sm:px-1"
        placeholder="Select Country"
        onChange={(e) => handleCountryChange(e.target.value)}
        value={selectedCountry || ""}
        name="country"
        isRequired
      >
        {data.countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        className="w-full sm:w-1/2 sm:px-1"
        placeholder="Select State"
        onChange={(e) => handleStateChange(e.target.value)}
        value={selectedState || ""}
        name="state"
        disabled={!selectedCountry}
      >
        {selectedCountry &&
          getStates(selectedCountry).map((state) => (
            <SelectItem key={state.name} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
      </Select>
      <Select
        className="mb-2 w-full sm:w-1/2 sm:px-1"
        placeholder="Select City"
        onChange={(e) => handleCityChange(e.target.value)}
        value={address.city || ""}
        name="city"
        disabled={!selectedState}
      >
        {selectedState &&
          getCities(selectedCountry!, selectedState).map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
      </Select>
      <Input
        className="w-full sm:w-1/2 sm:px-1"
        variant="bordered"
        isRequired
        radius="lg"
        size="sm"
        placeholder="5-digit"
        label="Postal Code"
        name="postal_code"
        pattern="^\d{5}$"
        errorMessage="Please enter a valid postal code"
      />
    </div>
  );
};

export default AddressForm;
