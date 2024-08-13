import React from "react";
import {
  defineMessages,
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  useIntl,
} from "react-intl";

const messsages = defineMessages({
  username: {
    id: "username",
    defaultMessage: "用户名",
  },
  rememberMe: {
    id: "rememberMe",
  },
});
const App: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <div>
        <div>
          <FormattedDate value={new Date()} dateStyle="full"></FormattedDate>
        </div>
        <div>
          <FormattedMessage id={messsages.rememberMe.id}></FormattedMessage>
        </div>
        <div>
          <FormattedNumber
            style="unit"
            unit="meter"
            value={2000}
          ></FormattedNumber>
        </div>
        <div>
          <div>{intl.formatMessage(messsages.username, { name: "光" })}</div>
          <div>
            <FormattedMessage
              id={messsages.username.id}
              values={{ name: "东" }}
            ></FormattedMessage>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
