"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DownloadModal({ trigger }: { trigger: React.ReactNode }) {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/chat/apps")
      .then((res) => res.json())
      .then(setApps);
  }, []);

  const openLink = (url?: string) => {
    if (!url) return alert("App will be available soon 👍");
    window.open(url, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-lg">
        {/* REQUIRED FOR ACCESSIBILITY */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Download CarConnect Apps
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[420px] overflow-y-auto space-y-6 p-2">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-slate-50 rounded-2xl p-4 shadow flex flex-col items-center"
            >
              <div className="w-40 h-40 relative rounded-xl overflow-hidden">
                <Image
                  src={app.thumbnail}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 font-bold">{app.name}</h3>

              <div className="flex gap-4 mt-4">
                <Image
                  src="/play-store.png"
                  alt="Google Play"
                  width={40}
                  height={40}
                  className="cursor-pointer"
                  onClick={() => openLink(app.playstore)}
                />

                <Image
                  src="/app-store.png"
                  alt="App Store"
                  width={95}
                  height={40}
                  className="cursor-pointer"
                  onClick={() => openLink(app.appstore)}
                />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
