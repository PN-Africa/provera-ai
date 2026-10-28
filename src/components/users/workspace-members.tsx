export function WorkspaceMembers() {
  return (
    <section className="mt-6 rounded-[10px] border border-[#3A3A43] bg-[#202026] px-6 py-6">
      <h2 className="font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
        Workspace members
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <p className="font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
            Workspace owner
          </p>
        </div>

        <div>
          <p className="font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
            Administrator
          </p>
        </div>

        <div>
          <p className="font-sans text-[16px] font-normal leading-[24px] text-[#8FD6C0]">
            Active
          </p>
        </div>
      </div>
    </section>
  );
}
