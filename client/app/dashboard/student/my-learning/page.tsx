"use client";

export default function MyLearningPage() {
    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">My Learning</h1>
            <p className="text-neutral-400">Track your progress and active courses here.</p>
            
            <div className="mt-8 p-10 border border-dashed border-neutral-800 rounded-lg text-center text-neutral-500">
                You are not enrolled in any courses yet.
            </div>
        </div>
    )
}
