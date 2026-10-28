type UsersToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
  onPermissions: () => void;
};

export function UsersToolbar({
  search,
  onSearchChange,
  onAddUser,
  onPermissions,
}: UsersToolbarProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search name or email"
        aria-label="Search members by name or email"
        className="min-h-[46px] rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-white outline-none focus:border-[#34E89A]"
      />
      <button
        type="button"
        onClick={onAddUser}
        className="min-h-[46px] rounded-lg bg-[#34E89A] px-6 text-sm font-medium text-black hover:bg-[#90EFC5]"
      >
        Add user
      </button>
      <button
        type="button"
        onClick={onPermissions}
        className="min-h-[46px] rounded-lg border border-[#393943] bg-[#202027] px-5 text-sm text-white hover:bg-[#292930]"
      >
        Role permissions
      </button>
    </div>
  );
}
