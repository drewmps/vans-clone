export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-4 items-center text-center">
      <img src="/vans-family-logo.png" alt="Vans Family" className="h-16" />

      <h2 className="text-xl font-bold">Get in the Vans Family</h2>
      <p className="text-gray-600 text-sm">
        Earn and redeem points on purchases and unlock your next reward.
      </p>

      <div className="flex flex-col w-full gap-1 text-left">
        <div className="flex flex-col  border border-solid py-1 px-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-700"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered p-0 w-full"
          />
        </div>
        <span className="text-xs text-gray-500">
          Example: johndoe@email.com
        </span>
      </div>

      <button className="btn btn-neutral w-full mt-2">Continue</button>
    </div>
  );
}
