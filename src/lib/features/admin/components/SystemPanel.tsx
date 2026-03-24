'use client'

export const SystemPanel = () => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">

            <h2 className="text-lg font-semibold text-gray-900">
                System Updates
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
                <p>📢 New Vendor Protocol</p>
                <p>📢 Compliance Update</p>
            </div>

            <div>
                <p className="text-sm text-gray-500 mb-2">
                    System Status
                </p>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[99%]" />
                </div>

                <p className="text-xs text-right text-green-600 mt-1">
                    99.9%
                </p>
            </div>

        </div>
    )
}