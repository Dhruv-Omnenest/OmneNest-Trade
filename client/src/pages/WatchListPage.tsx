import { Scrip, useWatchlistStore } from '@/store/watchlist.store';
import { ScripCard } from '@/widgets/WishList/ScriptCard';
import { WatchlistTabs } from '@/widgets/WishList/WatchlistTabs';
import React, { useEffect } from 'react';

const WatchlistPage: React.FC = () => {
    const { scrips, isLoading, initWatchlists, error } = useWatchlistStore();

    useEffect(() => {
        initWatchlists();
    }, [initWatchlists]);

    return (
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm border-x border-gray-100">
            {/* Sticky Header Section */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
                <div className="px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Watchlist</h1>
                    <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        LIVE
                    </div>
                </div>
                <WatchlistTabs />
            </div>

            {/* Main Content Area */}
            <main className="flex flex-col min-h-[calc(100vh-120px)]">
                {isLoading && scrips.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-3 opacity-60">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-medium text-gray-500">Updating market prices...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex items-center justify-center p-6 text-center">
                        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg w-full">
                            {error}
                        </p>
                    </div>
                ) : scrips.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                        {scrips.map((scrip: Scrip) => (
                            <ScripCard key={scrip.scripToken} scrip={scrip} />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-2">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📋</span>
                        </div>
                        <p className="text-gray-900 font-semibold">No scrips found</p>
                        <p className="text-sm text-gray-400">Add stocks to this watchlist to track them here.</p>
                    </div>
                )}
            </main>

            {/* Footer Padding for Mobile Bottom Nav (if any) */}
            <div className="h-16" />
        </div>
    );
};

export default WatchlistPage;