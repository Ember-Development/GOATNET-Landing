import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  header?: ReactNode;
  width?: string;
  topOffset?: string;
}

export default function Panel({
  children,
  header,
  width = "w-[calc(100%-5.7rem)]",
  topOffset = "top-20",
}: PanelProps) {
  return (
    <div
      className={`
        fixed
        ${topOffset}           
        left-20                
        h-[calc(100%-8rem)]    
        ${width}               
        flex                   
        items-center           
        justify-center         
        p-4                    
      `}
    >
      <div
        className="
          flex
          flex-col
          h-full
          w-full
          bg-white/5          
          backdrop-blur-2xl      
          border
          border-white/10       
          rounded-3xl          
          shadow-xl            
          overflow-hidden      
        "
      >
        {header && (
          <div className="relative">
            <div
              className="
                absolute inset-0
                backdrop-blur-2xl 
                border-white/10
                rounded-t-3xl  
              "
            />
            <div className="relative z-10 py-4 px-6">{header}</div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
