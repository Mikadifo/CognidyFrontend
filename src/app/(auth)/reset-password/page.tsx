import { Suspense } from "react";
import ResetPasswordController from "./ResetController";

export default function ResetPasswordPage() {
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordController />
  </Suspense>;
}
