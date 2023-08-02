import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Form, Space, Spin } from 'antd';

const _formInputs = [ // mock
    {
        type: 'TextField',
        label: 'First Name',
        name: 'firstName',
    },
    {
        type: 'render',
        label: 'First Name',
        name: 'lastName', xs: 12, sm: 6,
        render: () => { }
    }
];

// Define PropTypes for each object in formFormat
const formFormatPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        type: PropTypes.oneOf(['TextField', 'render']).isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        xs: PropTypes.number,
        sm: PropTypes.number,
        render: props => (props.type === 'render' ? PropTypes.func.isRequired : null),
    })
).isRequired;

// Set default values for xs and sm
formFormatPropTypes.defaultProps = {
    xs: 12,
    sm: 6,
};

UserAddForm.propTypes = {
    formInputs: formFormatPropTypes,
    submitFunc: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({}),
};

export default function UserAddForm({
    formInputs,
    submitFunc,
    buttonLabel,
    initialValues = {},
}) {
    const [form] = Form.useForm();
    const [isFetching, setFetching] = useState(false);

    const handleSubmit = (fields) => {
        const payload = {};
        formInputs.forEach((formInput) => {
            payload[formInput.name] = fields[formInput.name];
        })
        submitFunc(payload, setFetching);
    }

    return (
        <>
            <Form
                name='basic'
                form={form}
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                <Grid container spacing={3}>
                    {...formInputs.map((formInput) => {
                        if (formInput.type === 'TextField')
                            return (
                                <Grid item xs={formInput.xs || 12} sm={formInput.sm || 6}><Form.Item
                                    noStyle
                                    id={formInput.name}
                                    name={formInput.name}><TextField
                                        required
                                        fullWidth
                                        disabled={formInput.disable ? true : false}
                                        label={formInput.label}
                                    /></Form.Item></Grid>
                            )
                        if (formInput.type === 'render')
                            return (
                                <Grid item xs={formInput.xs || 12} sm={formInput.sm || 6}>
                                    <Form.Item
                                        noStyle
                                        id={formInput.name}
                                        name={formInput.name}>
                                        {formInput.render()}
                                    </Form.Item>
                                </Grid>
                            )
                    })}
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Use this address for payment details"
                        />
                    </Grid> */}
                    <Grid item sm={6} xs={6}>
                        <LoadingButton loading={isFetching} fullWidth size="large" type="submit" variant="contained">
                            {buttonLabel}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Form >
        </>
    );
}