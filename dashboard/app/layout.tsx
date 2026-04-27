import { AntdRegistry } from '@ant-design/nextjs-registry'
import 'antd/dist/reset.css'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
