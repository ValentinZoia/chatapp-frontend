import type { ChatroomEntity, GetChatroomsForSearchQuery, GetChatroomsForSearchQueryVariables } from "@/gql/graphql";
import { SEARCH_CHATROOMS_QUERY } from "@/graphql/queries/SearchChatroomsQuery";
import { useSearch } from "@/hooks/use-search";
import { useNavigate } from 'react-router-dom'; // o tu router
import { cn } from "@/lib/utils";



function SearchInput() {
  const navigate = useNavigate();

  const search = useSearch<GetChatroomsForSearchQuery, GetChatroomsForSearchQueryVariables>({
    queryDoc: SEARCH_CHATROOMS_QUERY,
    buildVariables: (query) => ({
      searchTerm: query,
      limit: 5, // Solo mostramos 5 en el dropdown
    }),
    minQueryLength: 1, // Empezar a buscar desde 1 caracter.
  });

  const chatrooms = search.queryResult.data?.getChatroomsForSearch.chatrooms || [];
  const totalCount = search.queryResult.data?.getChatroomsForSearch.totalCount || 0;
  const hasMoreResults = totalCount > 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    search.setQuery(value);
    search.setIsOpen(value.length > 0);
  };

  const handleSelectChatroom = (chatroom: NonNullable<ChatroomEntity>) => {
    if (!chatroom.name) return;
    // Redirigir a la sala
    navigate(`/room/${chatroom.id}`);
    search.clearSearch();
  };

  const handleViewMore = () => {
    navigate(`/search?q=${encodeURIComponent(search.debouncedQuery)}`);
    search.clearSearch();
  };

  return (
    <div className="searchContainer relative">
      <input
        type="text"
        name="text"
        required
        className="inputSearch"
        autoComplete="off"
        placeholder="Busca una Sala..."
        value={search.query}
        onChange={handleInputChange}
      />
      <div className="iconSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
          <path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828z" fill="#333" />
          <circle cx="40" cy="40" r="28" fill="none" stroke="#333" strokeWidth="4" />
          <g transform="translate(40, 40) scale(1.17)">
            <g transform="translate(-24, -24)">
              <circle cx="24" cy="24" r="21" fill="#eff3f9"></circle>
              <path fill="#cfe0f3" d="m28,40c-11.046,0-20-8.954-20-20,0-5.818,2.5-11.04,6.465-14.694C7.665,8.781,3,15.839,3,24c0,11.598,9.402,21,21,21,8.161,0,15.219-4.665,18.694-11.466-3.655,3.966-8.876,6.466-14.694,6.466Z"></path>
              <path fill="#0d3b8d" d="M22.824 15.166l-6.851 4.977c-.701.509-.994 1.412-.727 2.236l2.617 8.054c.268.824 1.036 1.382 1.902 1.382h8.468c.866 0 1.634-.558 1.902-1.382l2.617-8.054c.268-.824-.026-1.727-.727-2.236l-6.851-4.977c-.701-.509-1.65-.509-2.351 0zM30.25 3.94l-5.07 3.68c-.71.51-1.65.51-2.36 0l-5.06-3.68c1.97-.61 4.07-.94 6.24-.94s4.27.33 6.25.94z"></path>
              <path fill="#00286f" d="M8.06 20.06l-5.05 3.67c.05-4.41 1.46-8.49 3.84-11.84l1.93 5.93c.27.82-.02 1.73-.72 2.24zM17.25 43.89c-4.06-1.38-7.57-3.96-10.09-7.33h6.26c.87 0 1.63.56 1.9 1.38l1.93 5.95z"></path>
              <path fill="#0d3b8d" d="m40.84,36.56c-2.52,3.37-6.03,5.95-10.09,7.33l1.93-5.95c.27-.82,1.03-1.38,1.9-1.38h6.26Z"></path>
              <path fill="#00286f" d="m32.154,39.562l-1.404,4.328c4.06-1.38,7.57-3.96,10.09-7.33h-1.625c-2.102,1.426-4.491,2.459-7.061,3.002Z"></path>
              <path fill="#0d3b8d" d="m44.99,23.73l-5.05-3.67c-.7-.51-.99-1.42-.72-2.24l1.93-5.93c2.38,3.35,3.79,7.43,3.84,11.84Z"></path>
              <path fill="#08105e" d="m24,2C11.869,2,2,11.869,2,24s9.869,22,22,22,22-9.869,22-22S36.131,2,24,2Zm16.292,33.56h-5.711c-.295,0-.58.048-.852.129l-3.03-4.17c.162-.235.297-.494.389-.776l2.617-8.054c.089-.276.131-.557.14-.835l4.895-1.59c.173.225.375.432.613.606l4.636,3.369c-.05,4.216-1.414,8.114-3.696,11.322Zm-26.02.129c-.272-.081-.557-.129-.852-.129h-5.711c-2.283-3.207-3.646-7.106-3.696-11.322l4.637-3.37c.238-.174.44-.38.612-.605l4.894,1.59c.009.279.05.56.14.836l2.617,8.053c.092.283.226.541.389.776l-3.03,4.17ZM6.562,14.237l1.268,3.896c.134.407-.014.868-.358,1.119l-3.324,2.416c.312-2.673,1.151-5.184,2.414-7.43Zm12.253,15.888l-2.617-8.054c-.134-.414.012-.863.363-1.118l6.851-4.978c.352-.256.824-.256,1.176,0l6.851,4.978c.352.255.498.705.363,1.118l-2.617,8.054c-.134.413-.516.69-.951.69h-8.468c-.435,0-.817-.277-.951-.69Zm21.714-10.873c-.346-.252-.493-.712-.358-1.123l1.267-3.893c1.263,2.246,2.102,4.757,2.414,7.43l-3.323-2.415Zm-.497-7.158l-1.762,5.413c-.093.281-.136.567-.145.851l-4.891,1.589c-.174-.228-.379-.437-.621-.613l-6.851-4.978c-.238-.173-.497-.302-.764-.396v-5.138c.268-.094.528-.222.769-.395l4.623-3.363c3.889,1.317,7.235,3.798,9.64,7.028Zm-12.112-7.703l-3.323,2.417c-.364.26-.832.26-1.189.004l-3.328-2.421c1.268-.253,2.578-.391,3.92-.391s2.652.138,3.92.391Zm-10.312.675l4.629,3.366c.238.171.496.298.763.392v5.137c-.267.095-.525.223-.764.396l-6.851,4.978c-.242.176-.447.385-.621.613l-4.89-1.589c-.009-.283-.052-.569-.144-.849l-1.763-5.416c2.405-3.23,5.751-5.711,9.64-7.028Zm-8.267,32.493h4.079c.432,0,.813.278.949.689l1.263,3.891c-2.391-1.107-4.521-2.67-6.29-4.581Zm8.702,5.534l-1.773-5.465c-.091-.277-.224-.529-.382-.76l3.036-4.178c.269.079.551.126.843.126h8.468c.292,0,.574-.048.843-.126l3.036,4.179c-.159.232-.292.486-.384.764l-1.772,5.462c-1.882.589-3.883.907-5.957.907s-4.075-.318-5.957-.907Zm14.326-.953l1.261-3.888c.137-.415.519-.693.95-.693h4.079c-1.769,1.911-3.9,3.474-6.29,4.581Z"></path>
            </g>
          </g>
        </svg>
      </div>

      {search.isOpen && (
        <div className="absolute right-0 mt-2 min-w-full w-auto max-w-[calc(100vw-1rem)] md:w-[400px] max-h-[350px] overflow-y-auto bg-background border rounded shadow-md z-50 origin-top-right">
          {search.isSearching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Buscando...</div>
          ) : search.hasResults && search.queryResult.data ? (
            <div className="py-2">
              {chatrooms.map((chatroom) => (
                <button
                  key={chatroom.id}
                  onClick={() => handleSelectChatroom(chatroom)}
                  className={cn(
                    "cursor-pointer w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors",
                    "text-left",
                  )}
                >
                  <div className="flex-1">
                    <div className="font-medium text-primary">{chatroom.name}</div>
                    {chatroom.description && (
                      <div className="text-sm text-muted-foreground truncate">
                        {chatroom.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}

              {hasMoreResults && (
                <button
                  onClick={handleViewMore}
                  className={cn(
                    "w-full px-4 py-3 text-sm font-medium text-primary hover:bg-accent transition-colors",
                    "border-t"
                  )}
                >
                  Ver todos los resultados ({totalCount})
                </button>
              )}
            </div>
          ) : search.debouncedQuery ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No se encontraron Salas
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
