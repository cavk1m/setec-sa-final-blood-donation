import { AntdRegistry } from '@ant-design/nextjs-registry'
import 'antd/dist/reset.css'
import './globals.css'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConfigProvider } from 'antd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
