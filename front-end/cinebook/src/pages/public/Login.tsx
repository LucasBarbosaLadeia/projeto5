import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../contexts/auth";

type ILoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<ILoginForm>();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onSubmit = useCallback(
    async (values: ILoginForm) => {
      try {
        setLoading(true);
        const { data } = await axios.post("/login", {
          email: values.email,
          password: values.password,
        });
        authContext.login(data.token);
        navigate("/movies");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert({
            description: error?.response?.data?.error,
          });
        } else {
          alert({
            description: "Função indisponível, tente novamente mais tarde",
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [authContext, navigate]
  );

  return (
    <article>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex flex-col gap-8 pt-10">
          <input
  type="email"
  {...form.register("email", { required: "O e-mail é obrigatório" })}
/>

<input
  type="password"
  {...form.register("password", { required: "A senha é obrigatória" })}
/>
            <button type="submit" className="bg-slate-800" disabled={loading}>
              Entrar
            </button>
          </section>
        </form>
      </FormProvider>
    </article>
  );
};

const Login = () => {
  return (
    <div className="flex">
    
      <section className="py-12 px-24 flex-1">
    
        <div className=" pt-32">
          <h1 className="text-4xl font-semibold pb-4">Entrar</h1>
          <span className="text-slate-700">
            Informe o e-mail e senha cadastrados. Novo por aqui?
            <Link
              to="/signup"
              className="text-teal-600 hover:border-b font-medium"
            >
              {" "}
              Cadastre-se!
            </Link>
          </span>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default Login;