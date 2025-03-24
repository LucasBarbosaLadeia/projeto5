import { Link } from "react-router";

const Login = () => {

      
    
        return (
          <div className="flex">
            
             
             
            
            <section className="py-12 px-24 flex-1">
            
              <div className=" pt-32">
                <h1 className="text-4xl font-semibold pb-4">Entrar</h1>
                <span className="text-slate-700">
                  Insira o e-mail e senha cadastrados. 
                  <Link
                    to="/signup"
                    className="text-teal-600 hover:border-b font-medium"
                  >
                    {" "}
                    Cadastre-se!
                  </Link>
                </span>
              
              </div>
            </section>
          </div>
        );
      };
      
      export default Login;