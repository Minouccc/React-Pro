import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useIntl, defineMessages } from "react-intl";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const messsages = defineMessages({
  username: {
    id: "username",
    defaultMessage: "用户名",
  },
  password: {
    id: "password",
  },
  rememberMe: {
    id: "rememberMe",
  },
  submit: {
    id: "submit",
  },
  inputYourUsername: {
    id: "inputYourUsername",
  },
  inputYourPassword: {
    id: "inputYourPassword",
  },
});

const App: React.FC = () => {
  const intl = useIntl();

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label={intl.formatMessage(messsages.username)}
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage(messsages.inputYourUsername),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={intl.formatMessage(messsages.password)}
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage(messsages.inputYourUsername),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>{intl.formatMessage(messsages.rememberMe)}</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {intl.formatMessage(messsages.submit)}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
