import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
// import { Input } from '@/components/ui/input'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddMembersStepProps {
  searchResults: Array<{ label: string; value: string }>;
  selectedUsers: string[];
  onSearchChange: (term: string) => void;
  onSelectUser: (users: string[]) => void;
  loading: boolean;
}

function AddMembersStep({
  searchResults,
  selectedUsers,
  onSearchChange,
  onSelectUser,
  loading,
}: AddMembersStepProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (value: string, label: string) => {
    setSearchValue(label);
    if (selectedUsers.includes(value)) {
      removeUser(value);
    } else {
      onSelectUser([...selectedUsers, value]);
    }
  };

  const removeUser = (userId: string) => {
    onSelectUser(selectedUsers.filter((id) => id !== userId));
    setSearchValue("");
  };

  const selectedUserLabels = selectedUsers
    .map((id) => searchResults.find((user) => user.value === id)?.label)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Members</Label>

        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedUsers.length > 0
                ? `${selectedUsers.length} user(s) selected`
                : "Search and select users..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search users..."
                value={searchValue}
                disabled={loading}
                onValueChange={(value) => {
                  setSearchValue(value);
                  onSearchChange(value);
                }}
              />

              <CommandGroup className="max-h-64 overflow-auto">
                <p>muy bueno</p>
                {searchResults &&
                  searchResults.map((user) => (
                    <>
                      <p>Naheee</p> <h1>{user.label}</h1>
                    </>
                  ))}
                {!searchResults && <h1>No se encontraron resultados</h1>}

                <CommandEmpty>No users found.</CommandEmpty>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-transparent"
            >
              {searchValue || "Buscar usuario..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Buscar usuario..."
                onValueChange={onSearchChange}
                disabled={loading}
              />
              <CommandList>
                <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                <CommandGroup>
                  {searchResults.map((user, index) => (
                    <CommandItem
                      key={`${user.label}-${index}`}
                      value={user.label}
                      onSelect={() => handleSelect(user.value, user.label)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          searchValue === user.label
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {user.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedUsers.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Members</Label>
          <div className="flex flex-wrap gap-2">
            {selectedUserLabels.map((label, index) => (
              <Badge
                key={selectedUsers[index]}
                variant="secondary"
                className="gap-4"
              >
                {label}
                <div>
                  <XIcon
                    className="h-3 w-3 hover:text-red-600  cursor-pointer"
                    onClick={() => removeUser(selectedUsers[index])}
                  />
                </div>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default AddMembersStep;
