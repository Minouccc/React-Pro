import React from "react";
import { useIntl } from "react-intl";

const App: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <div>
        日期：
        <div>{intl.formatDate(new Date(), { weekday: "long" })}</div>
        <div>{intl.formatDate(new Date(), { weekday: "short" })}</div>
        <div>{intl.formatDate(new Date(), { weekday: "narrow" })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: "full" })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: "long" })}</div>
      </div>
      <div>
        相对时间：
        <div>{intl.formatRelativeTime(200, "hour")}</div>
        <div>{intl.formatRelativeTime(-10, "minute")}</div>
      </div>
      <div>
        数字：
        <div>
          {intl.formatNumber(200000, {
            style: "currency",
            currency: intl.locale.includes("en") ? "USD" : "CNY",
          })}
        </div>
        <div>
          {intl.formatNumber(10000, {
            style: "unit",
            unit: "meter",
          })}
        </div>
      </div>
    </>
  );
};

export default App;
