import "./App.css";
import { Button } from "./components/ui/button";
import { useQuery } from "@apollo/client/react";
import { GET_HELLO } from "./graphql/queries/Hello";
import FindUserById from "./components/find-user-id";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import CreateUser from "./components/create-user";

function App() {
  const { loading, error, data } = useQuery<{ hello: string }>(GET_HELLO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-3xl text-red-500 ">Hola maquinas!</h1>

      <Button>Button</Button>

      {data && data.hello}
      <FindUserById id={1} />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <CreateUser />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
