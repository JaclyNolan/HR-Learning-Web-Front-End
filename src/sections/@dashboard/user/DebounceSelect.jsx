import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, presetOptions = [], ...props }) {
    const { name, label, value = '', ...props2 } = props;
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
        <Autocomplete
            fullWidth
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => `${option.value}`}
            // inputValue={}
            autoHighlight={false}
            options={options}
            loading={fetching}
            onInputChange={(event, value) => {debounceFetcher(value)}}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...props2}
                    label={label}
                    name={name}
                    defaultValue={value.toString()}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {fetching ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}

export default DebounceSelect