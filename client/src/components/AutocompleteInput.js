import React, { useEffect, useRef } from "react";

function ensureGoogleLoaded() {
  return new Promise(waitForGoogle);

  function waitForGoogle(resolve, reject) {
    if (window.google && window.google.maps) resolve(window.google.maps);
    else setTimeout(waitForGoogle.bind(this, resolve, reject), 30);
  }
}

const AutocompleteInput = ({ value, onChange, onPlaceChanged, onClick }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    ensureGoogleLoaded().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: ["us", "ca"] },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onChange(place.formatted_address);
        if (onPlaceChanged) {
          onPlaceChanged(place);
        }
      });
    });

    return () => {
      if (window.google && window.google.maps) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current
        );
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onChange, onPlaceChanged]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
      placeholder=""
    />
  );
};

export default AutocompleteInput;
