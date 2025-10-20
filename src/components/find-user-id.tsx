import { GET_USER_BY_ID } from "@/graphql/queries/FindUserById";
import { useQuery } from "@apollo/client/react";

function FindUserById({ id }: { id: number }) {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
export default FindUserById;
