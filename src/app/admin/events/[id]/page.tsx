"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function EventDetailPage() {
    const { id } = useParams();

    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data.data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!event) return <p className="p-6">Event not found</p>;

    return (
        <div className="p-6 space-y-6">

            {/* 🔥 HERO COVER */}
            <div className="relative w-full h-72 rounded-2xl overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                {/* Text overlay */}
                <div className="absolute bottom-4 left-6 text-white">
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <p className="text-sm opacity-80 flex items-center mt-1">
                        <Calendar size={14} className="mr-1" />
                        {new Date(event.eventDate).toDateString()}
                    </p>
                </div>

                {/* STATUS */}
                <div className="absolute top-4 right-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${event.isActive
                                ? "bg-green-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                    >
                        {event.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                </div>
            </div>

            {/* ⚡ ACTION BAR */}

            {/* 📝 DESCRIPTION CARD */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                    {event.description}
                </p>
            </div>

            {/* 🖼️ GALLERY */}
            {/* 🖼️ GALLERY */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Gallery</h2>
                    <span className="text-sm text-gray-400">
                        {event.images?.length || 0} images
                    </span>
                </div>

                {/* EMPTY STATE */}
                {event.images?.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        No images uploaded
                    </div>
                ) : (

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                        {event.images.map((img: any) => (
                            <div
                                key={img.id}
                                className="relative w-full h-40 rounded-xl overflow-hidden group cursor-pointer"
                            >

                                {/* IMAGE */}
                                <Image
                                    src={img.fileUrl}
                                    alt="event"
                                    fill
                                    className="object-cover transition duration-300 group-hover:scale-110"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                                    {/* VIEW TEXT */}
                                    <span className="text-white text-sm font-medium tracking-wide">
                                        View
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}