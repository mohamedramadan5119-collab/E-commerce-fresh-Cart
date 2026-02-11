"use client";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex w-full flex-col justify-center items-center h-[80vh] gap-4">
      <div className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 rounded-3xl shadow-xl transition-all animate-in fade-in zoom-in duration-500">
        <Item variant="muted" className="border-none bg-transparent">
          <ItemMedia className="flex justify-center items-center mb-4">
            <Spinner size="lg" className="text-[#0aad0a] w-10 h-10" />
          </ItemMedia>

          <ItemContent className="text-center">
            <ItemTitle className="text-xl font-bold tracking-tight text-gray-700 animate-pulse">
              Fresh <span className="text-[#0aad0a]">Cart</span>
            </ItemTitle>
            <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-[0.2em]">
              Preparing your experience...
            </p>
          </ItemContent>
        </Item>
      </div>

      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[#0aad0a] animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#0aad0a] animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#0aad0a] animate-bounce"></div>
      </div>
    </div>
  );
}
