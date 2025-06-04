export default function SessionsTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Completed Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Cancelled Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">
            Pending Sessions
          </h3>
          <p className="text-4xl font-medium text-neutral-100">14</p>
        </div>
        <div>
          <h3 className="text-neutral-200 text-sm mb-1">-</h3>
          <p className="text-4xl font-medium text-neutral-100">10</p>
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4 text-neutral-100">
          Available sessions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
            <div
              key={day}
              className="border border-secondary-500 bg-secondary-800 rounded-md p-3 text-center"
            >
              <div className="font-medium text-neutral-100">{day}</div>
              <div className="text-xs text-secondary-500">5 slots</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Friday", "Saturday", "Sunday"].map((day) => (
            <div
              key={day}
              className="border rounded-md p-3 text-center"
            >
              <div className="font-medium">{day}</div>
              <div className="text-xs text-gray-500">5 slots</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4">
          Available time slots
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-full py-2 px-4 text-center"
            >
              <div className="text-sm">7:30 PM</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="border rounded-full py-2 px-4 text-center"
            >
              <div className="text-sm">7:30 PM</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
