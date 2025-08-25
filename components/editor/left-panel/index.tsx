import { HtmlHistory } from "@/types";
import { Button } from "@/components/ui/button";

export function LeftPanel({
  history,
  setHtml,
}: {
  history: HtmlHistory[];
  setHtml: (html: string) => void;
}) {
  return (
    <div className="w-1/4 bg-neutral-900 p-4 overflow-y-auto">
      <header className="text-lg font-semibold text-neutral-200 mb-4">
        History
      </header>
      <main>
        <ul>
          {history?.map((item, index) => (
            <li
              key={index}
              className="text-gray-300 text-xs py-2 border-b border-gray-800 last:border-0 flex items-center justify-between gap-2"
            >
              <div className="">
                <span className="line-clamp-1">{item.prompt}</span>
                <span className="text-gray-500 text-[10px]">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  }) +
                    " " +
                    new Date(item.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                </span>
              </div>
              <Button
                variant="sky"
                size="xs"
                onClick={() => {
                  setHtml(item.html);
                }}
              >
                Select
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
