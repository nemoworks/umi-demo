import { Card, Form, Input, InputNumber, Button } from 'antd';
import React, { Component } from 'react';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'dva';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

/* eslint-enable no-template-curly-in-string */
class Employee extends Component {
  formRef = React.createRef();

  componentDidMount() {
    if (this.props.location.query.key) {
      this.prevalues = this.props.data.find(element => element.key === this.props.location.query.key);
      this.formRef.current.setFieldsValue(this.prevalues);
    }
  }

  onFinish = values => {
    if (this.props.location.query.key) {
      this.props.dispatch({ type: 'employees/edit', payload: {...this.prevalues, ...values} });
    }
    else {
      this.props.dispatch({ type: 'employees/append', payload: values })
    };
  };

  render() {
    return (
      <Card>
        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="firstName"
            label="FirstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="LastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default connect(({ employees }) => ({ data: employees }))(Employee);
