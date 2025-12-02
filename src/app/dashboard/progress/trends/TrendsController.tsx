"use client";

import Alert from "@/app/components/Alert";
import GuestLoginCTA from "@/app/components/GuestLoginCTA";
import LineChartTrend from "@/app/components/LineChartTrend";
import { useApi } from "@/app/hooks/useApi";
import { useAuth } from "@/app/hooks/useAuth";
import Session from "@/app/models/Session";
import TrendsSkeleton from "@/app/skeletons/TrendsSkeleton";
import { api } from "@/app/utils/apiFetch";
import { FC, useEffect, useState } from "react";

export const TrendsController: FC = ({}) => {
  const { getToken } = useAuth();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [token, setToken] = useState("");
  const {
    submit: getSessions,
    loading,
    error,
    data: sessions,
  } = useApi<Session[], []>(api.fetchSessions);

  useEffect(() => {
    setToken(getToken() || "");
  }, [getToken]);

  useEffect(() => {
    if (!getToken() || getToken() === "guest") {
      return;
    }

    getSessions();
  }, [getSessions]);

  useEffect(() => {
    if (error && typeof error === "string") {
      setAlert({
        open: true,
        message: "Something went wrong. Try again later",
        severity: "error",
      });
    }
  }, [error]);

  const hasSessions = () => {
    return sessions && sessions?.length > 0;
  };

  if (error && typeof error === "string") {
    return <Alert alert={alert} setAlert={setAlert} />;
  }

  if (token === "guest") {
    return <GuestLoginCTA />;
  }

  return (
    <div className="flex flex-col gap-16">
      {loading && <TrendsSkeleton />}
      {!hasSessions() && !loading && (
        <p className="text-md font-nunito">
          You haven&apos;t completed any session yet. Check the{" "}
          <a href="/dashboard/learning" className="font-bold hover:underline">
            learning
          </a>{" "}
          and{" "}
          <a href="/dashboard/study" className="font-bold hover:underline">
            study
          </a>{" "}
          section!
        </p>
      )}
      {hasSessions() && !loading && <LineChartTrend sessions={sessions!} />}
    </div>
  );
};
