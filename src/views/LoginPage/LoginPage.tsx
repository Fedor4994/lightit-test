import { useState } from "react";

import AuthForm from "../../components/AuthForm/AuthForm";

export type FormType = "Login" | "Register";

const LoginPage = () => {
  const [formType, setFormType] = useState<FormType>("Login");

  return <AuthForm formType={formType} handleFormChange={setFormType} />;
};

export default LoginPage;
