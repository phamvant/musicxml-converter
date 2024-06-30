import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { toJSON } from "@/components/toJson";
import { initData } from "@/components/dummy";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState<string>(initData);
  const [json, setJson] = useState<any[]>([]);

  useEffect(() => {
    try {
      setJson(toJSON(text));
    } catch (e) {}
    console.log(json);
  }, [text]);

  return (
    <main className={`${inter.className} h-screen`}>
      <div className="grid grid-cols-2 pt-20 px-20 gap-10">
        <div className="h-[100%] border-2 rounded-lg">
          <form className="p-0">
            <textarea
              rows={35}
              id="w3review"
              name="w3review"
              className="w-[100%] h-[100%] p-0"
              value={text}
              onChange={(e) => {
                setText(e.currentTarget.value);
              }}
            ></textarea>
          </form>
        </div>
        <div className=" h-[100%] p-5 -z-10 border-2 rounded-lg">
          <div className="sheet-music">
            {json.length
              ? json.map((measure: any[], idx: number) => {
                  return (
                    <div className="bar" key={idx}>
                      <div className="stave-header"></div>
                      {measure.map((note, index) => (
                        <div
                          key={index}
                          className={`${note.note} ${note.type}-note`}
                        ></div>
                      ))}
                      <div className="bar-line"></div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </main>
  );
}
