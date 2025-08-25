import classNames from "classnames";
import { FaMobileAlt } from "react-icons/fa";
import { HelpCircle, RefreshCcw, SparkleIcon } from "lucide-react";
import { FaLaptopCode } from "react-icons/fa6";
import { HtmlHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import { UserMenu } from "@/components/user-menu";
import { useUser } from "@/hooks/useUser";
import "@assets/own.css";

const DEVICES = [
  {
    name: "desktop",
    icon: FaLaptopCode,
  },
  {
    name: "mobile",
    icon: FaMobileAlt,
  },
];

export function Footer({
  onReset,
  device,
  setDevice,
  iframeRef,
}: {
  onReset: () => void;
  device: "desktop" | "mobile";
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
  setDevice: React.Dispatch<React.SetStateAction<"desktop" | "mobile">>;
}) {
  const { user } = useUser();

  const handleRefreshIframe = () => {
    if (iframeRef?.current) {
      const iframe = iframeRef.current;
      const content = iframe.srcdoc;
      iframe.srcdoc = "";
      setTimeout(() => {
        iframe.srcdoc = content;
      }, 10);
    }
  };

  return (
    <footer className="border-t bg-slate-200 border-slate-300 dark:bg-neutral-950 dark:border-neutral-800 px-3 py-2 flex items-center justify-between sticky bottom-0 z-20">
      <div className="flex items-center gap-2">
        {user &&
          (user?.isLocalUse ? (
            <>
              <div className="max-w-max bg-amber-500/10 rounded-full px-3 py-1 text-amber-500 border border-amber-500/20 text-sm font-semibold">
                Local Usage
              </div>
            </>
          ) : (
            <UserMenu className="!p-1 !pr-3 !h-auto" />
          ))}
        {user && <p className="text-neutral-700">|</p>}
        <Button
          size="sm"
          variant="secondary"
          onClick={onReset}
          className=" bg-[#151515] border border-[#383838]"
        >
          <MdAdd className="text-sm" />
          New <span className="max-lg:hidden">Project</span>
        </Button>
      </div>
      <div className="flex justify-end items-center gap-2.5">
        <a
          href="https://huggingface.co/spaces/victor/deepsite-gallery"
          target="_blank"
        >
          {/* <Button size="sm" variant="ghost">
            <SparkleIcon className="size-3.5" />
            <span className="max-lg:hidden">DeepSite Gallery</span>
          </Button> */}
        </a>
        <a
          target="_blank"
          href="https://huggingface.co/spaces/enzostvs/deepsite/discussions/157"
        >
          {/* <Button size="sm" variant="outline">
            <HelpCircle className="size-3.5" />
            <span className="max-lg:hidden">Help</span>
          </Button> */}
        </a>
        {/* <Button size="sm" variant="outline" onClick={handleRefreshIframe}>
          <RefreshCcw className="size-3.5" />
          <span className="max-lg:hidden">Refresh Preview</span>
        </Button> */}
        <div className="flex items-center rounded-full px-2 py-1 bg-[#151515] border border-[#383838] gap-1 max-lg:hidden">
          {[
            {
              name: "mobile",
              icon: (
                <svg
                  width="15"
                  height="21"
                  viewBox="0 0 15 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2857 1V2.33C10.2857 2.86205 10.2857 3.12808 10.1845 3.33129C10.0954 3.51004 9.95347 3.65537 9.77871 3.74646C9.58009 3.85 9.32009 3.85 8.8 3.85H6.2C5.67991 3.85 5.41993 3.85 5.22129 3.74646C5.04657 3.65537 4.90452 3.51004 4.81549 3.33129C4.71429 3.12808 4.71429 2.86205 4.71429 2.33V1M3.97143 20H11.0286C12.0687 20 12.5888 20 12.986 19.7929C13.3354 19.6108 13.6196 19.3201 13.7976 18.9626C14 18.5562 14 18.0241 14 16.96V4.04C14 2.9759 14 2.44385 13.7976 2.03742C13.6196 1.67991 13.3354 1.38924 12.986 1.20709C12.5888 1 12.0687 1 11.0286 1H3.97143C2.93134 1 2.41128 1 2.01402 1.20709C1.66457 1.38924 1.38046 1.67991 1.20242 2.03742C1 2.44385 1 2.9759 1 4.04V16.96C1 18.0241 1 18.5562 1.20242 18.9626C1.38046 19.3201 1.66457 19.6108 2.01402 19.7929C2.41128 20 2.93133 20 3.97143 20Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              name: "desktop",
              icon: (
                <svg
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.05 13V4.2C2.05 3.07989 2.05 2.51984 2.27889 2.09202C2.48022 1.71569 2.80147 1.40973 3.19662 1.21799C3.64583 1 4.23389 1 5.41 1H17.59C18.7661 1 19.3542 1 19.8034 1.21799C20.1985 1.40973 20.5198 1.71569 20.7211 2.09202C20.95 2.51984 20.95 3.0799 20.95 4.2V13H15.3458C15.0891 13 14.9607 13 14.8398 13.0276C14.7326 13.0521 14.6303 13.0925 14.5363 13.1474C14.4303 13.2092 14.3395 13.2957 14.158 13.4686L14.092 13.5314C13.9105 13.7043 13.8197 13.7908 13.7137 13.8526C13.6197 13.9075 13.5174 13.9479 13.4102 13.9724C13.2893 14 13.1609 14 12.9042 14H10.0958C9.83911 14 9.7107 14 9.58984 13.9724C9.48264 13.9479 9.38025 13.9075 9.28631 13.8526C9.18034 13.7908 9.08954 13.7043 8.90794 13.5314L8.84206 13.4686C8.66046 13.2957 8.56966 13.2092 8.46369 13.1474C8.36975 13.0925 8.26733 13.0521 8.16019 13.0276C8.03935 13 7.91094 13 7.65412 13H2.05ZM2.05 13C1.47011 13 1 13.4477 1 14V14.3333C1 14.9533 1 15.2633 1.07156 15.5176C1.26573 16.2078 1.83179 16.7469 2.55648 16.9319C2.82353 17 3.14902 17 3.8 17H19.2C19.851 17 20.1765 17 20.4435 16.9319C21.1682 16.7469 21.7342 16.2078 21.9285 15.5176C22 15.2633 22 14.9533 22 14.3333C22 14.0233 22 13.8683 21.9642 13.7412C21.8672 13.3961 21.5841 13.1265 21.2217 13.0341C21.0883 13 20.9255 13 20.6 13H19.9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
          ].map((deviceItem) => (
            <button
              key={deviceItem.name}
              className={classNames(
                "rounded-full size-9 flex items-center justify-center cursor-pointer transition-colors",
                {
                  "bg-[#313131]": device === deviceItem.name,
                  "hover:bg-[#313131]/70": device !== deviceItem.name,
                }
              )}
              onClick={() => setDevice(deviceItem.name as "desktop" | "mobile")}
            >
              {deviceItem.icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
