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
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { useState } from "react";

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

  const handleSelect = (value: string) => {
    if (selectedUsers.includes(value)) {
      onSelectUser(selectedUsers.filter((id) => id !== value));
    } else {
      onSelectUser([...selectedUsers, value]);
    }
  };

  const removeUser = (userId: string) => {
    onSelectUser(selectedUsers.filter((id) => id !== userId));
  };

  const selectedUserLabels = selectedUsers
    .map((id) => searchResults.find((user) => user.value === id)?.label)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Members</Label>
        <Popover open={open} onOpenChange={setOpen}>
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
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {searchResults.map((user) => (
                  <CommandItem
                    key={user.value}
                    value={user.value}
                    onSelect={() => handleSelect(user.value)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedUsers.includes(user.value)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {user.label}
                  </CommandItem>
                ))}
              </CommandGroup>
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
                className="gap-1"
              >
                {label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeUser(selectedUsers[index])}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default AddMembersStep;
