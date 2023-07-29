import { Autocomplete, Box, CircularProgress, Menu, MenuItem, TextField } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, presetOptions = [], ...props }) {
    const [open, setOpen] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [options, _setOptions] = useState([]);

    const setOptions = (newOptions) => {
        console.log(presetOptions.concat(newOptions));
        if (presetOptions) {
            _setOptions(presetOptions.concat(newOptions));
        } else {
            _setOptions(newOptions);
        }

    }
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    useEffect(() => {
        debounceFetcher.apply(null, [""])
    }, [])
    return (
        <TextField
            {...props}
            fullWidth
            select
            InputProps={{
                startAdornment: fetching ? <CircularProgress color="inherit" size={30} /> : null,
            }}
        >
            {...options.map((option) => (<MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>))}
        </TextField>
    );
}

export default DebounceSelect