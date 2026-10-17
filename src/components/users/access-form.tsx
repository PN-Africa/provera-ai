"use client";

import { FormEvent, useState } from "react";

export function AccessForm() {
  const [email, setEmail] = useState("analyst@company.com");
  const [role, setRole] = useState("Analyst");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Access saved:", {
      email,
      role,
    });
  }

  return (
    <section className="mt-6 w-full max-w-[780px] rounded-[10px] border border-[#343644] bg-[#1C1D27] p-6">
      <h2 className="font-manrope text-[28px] font-medium leading-[36px] tracking-[-0.3px] text-[#EDEFFF]">
        Add or update access
      </h2>

      <p className="mt-3 max-w-[700px] font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
        Save an approved email and role. This does not send an invitation or
        change the private site sharing settings.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none placeholder:text-[#7F8297] focus:border-[#455EFF]"
          />
        </div>

        {/* Role */}
        <div className="mt-5">
          <label
            htmlFor="role"
            className="font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]"
          >
            Role
          </label>

          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 h-[46px] w-full appearance-none rounded-[6px] border border-[#343644] bg-[#0B0B0E] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          >
            <option value="Analyst">Analyst</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="mt-4 flex h-[46px] w-[200px] items-center justify-center rounded-[6px] bg-[#455EFF] font-sans text-[14px] font-medium leading-[20px] text-white transition hover:bg-[#536BFF]"
        >
          Save access
        </button>
      </form>

      {/* Notice */}
      <div className="mt-4 rounded-[6px] border border-[#343644] bg-[#171A2E] px-4 py-4">
        <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          The workspace owner must retain administrator access.
        </p>
      </div>
    </section>
  );
}
